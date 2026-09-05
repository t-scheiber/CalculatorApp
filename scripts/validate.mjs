import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.match(html,/<!DOCTYPE html>/i);assert.match(html,/<title>Simple Calculator<\/title>/);
const assets=[...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m=>m[1]);
assert.ok(assets.includes('script.js')&&assets.includes('./style.css'));
for(const asset of assets){assert.match(asset,/^(?:\.\/)?[A-Za-z0-9_.-]+$/);assert.ok(fs.statSync(path.join(root,asset)).size>0);}
const buttons=[...html.matchAll(/<button\b[^>]*value="([^"]+)"[^>]*>/g)].map(m=>m[1]);
assert.deepEqual(buttons.sort(),['0','1','2','3','4','5','6','7','8','9','.','all-clear','+','-','*','/','='].sort());
assert.match(html,/<input\b[^>]*class="calculator-screen"[^>]*disabled/);
new vm.Script(fs.readFileSync(path.join(root,'script.js'),'utf8'),{filename:'script.js'});
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
for(const selector of ['.calculator','.calculator-screen','button','.operator','.equal-sign'])assert.ok(css.includes(selector));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8'));
assert.equal(Object.keys({...manifest.dependencies,...manifest.devDependencies,...manifest.optionalDependencies}).length,0);
console.log('Static assets, calculator controls, JavaScript syntax and dependency-free manifest validated.');

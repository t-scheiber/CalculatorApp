import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../script.js',import.meta.url),'utf8');
function calculator() {
  let click,value='';
  const display={get value(){return value;},set value(v){value=String(v);}};
  const keys={addEventListener(name,handler){assert.equal(name,'click');click=handler;}};
  const root={dataset:{},querySelector(selector){return selector==='.calculator-keys'?keys:display;}};
  const document={querySelector(selector){assert.equal(selector,'.calculator');return root;},addEventListener(name,handler){assert.equal(name,'DOMContentLoaded');handler();}};
  vm.runInNewContext(source,{document,console:{log(){}}},{timeout:1000});
  return (...values)=>{
    for(const value of values) {
      const classes=new Set('+-*/'.includes(value)?['operator']:value==='.'?['decimal']:value==='='?['equal-sign']:value==='all-clear'?['all-clear']:[]);
      click({target:{value,textContent:value==='all-clear'?'AC':value,matches:selector=>selector==='button',classList:{contains:name=>classes.has(name)}}});
    }
    return display.value;
  };
}
test('the four arithmetic operations produce the expected displayed value',()=>{
  for(const [operator,expected] of [['+','10'],['-','4'],['*','21'],['/','2.3333333333333335']])assert.equal(calculator()('7',operator,'3','='),expected);
});
test('a number after equals begins a new entry',()=>{const press=calculator();assert.equal(press('2','+','3','='),'5');assert.equal(press('6'),'6');});
test('a decimal after an operator begins a fractional operand',()=>assert.equal(calculator()('5','+','.','5','='),'5.5'));
test('decimal input has one decimal point',()=>assert.equal(calculator()('1','.','2','.','3'),'1.23'));
test('clear removes the pending calculation and starts at zero',()=>{const press=calculator();assert.equal(press('8','+','all-clear'),'0');assert.equal(press('2','='),'2');});
test('an operator after equals continues from the result',()=>assert.equal(calculator()('2','+','3','=','*','4','='),'20'));
test('replacing an operator retains the first operand',()=>assert.equal(calculator()('2','+','*','3','='),'6'));

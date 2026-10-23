import {readFile} from 'node:fs/promises';
import {test} from 'node:test';
import assert from 'node:assert/strict';

const source=await readFile(new URL('../functions/_middleware.js', import.meta.url),'utf8');
const {onRequest}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const run=(path,headers={})=>onRequest({request:new Request('https://infoenv-studio.com'+path,{headers}),next:()=>new Response('page',{status:200})});

test('homepage retains language negotiation and explicit preference',async()=>{
 for(const [headers,status] of [[{},302],[{'Accept-Language':'ja-JP,en;q=0.8'},200],[{Cookie:'lang=en','Accept-Language':'ja'},302],[{Cookie:'lang=ja','Accept-Language':'en'},200]]){
  const response=await run('/',headers);assert.equal(response.status,status);
  if(status===302)assert.equal(response.headers.get('Location'),'https://infoenv-studio.com/en');
 }
});
test('legal and support destinations are never redirected by language preferences',async()=>{
 for(const path of ['/rewatchkit/','/rewatchkit/privacy/','/rewatchkit/support/','/rewatchkit/en/','/rewatchkit/en/privacy/','/rewatchkit/en/support/','/rewatchkit/assets/site.css','/en/']){
  for(const headers of [{},{Cookie:'lang=en','Accept-Language':'ja'},{Cookie:'lang=ja','Accept-Language':'en'}]){
   const response=await run(path,headers);assert.equal(response.status,200,path);assert.equal(await response.text(),'page');
  }
 }
});

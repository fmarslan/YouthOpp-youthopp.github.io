import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import os from 'node:os';import path from 'node:path';import {build,escapeHtml,safeUrl,paginate} from '../scripts/build.mjs';
test('source escaping and safe schemes',()=>{assert.equal(escapeHtml('<script>"&'),'&lt;script&gt;&quot;&amp;');assert.equal(safeUrl('javascript:alert(1)'),'#');});
test('pagination bounds list pages',()=>assert.deepEqual(paginate(Array.from({length:61},(_,i)=>i),30).map(a=>a.length),[30,30,1]));
test('catalog pages preserve provenance, escape input and leave eligibility unknown',async()=>{const dir=await fs.mkdtemp(path.join(os.tmpdir(),'youthopp-'));const input=path.join(dir,'catalog.json');const out=path.join(dir,'site');await fs.writeFile(input,JSON.stringify({schema_version:'1.0',opportunities:Array.from({length:31},(_,i)=>({id:`test-${i}`,title:'Example <script>alert(1)</script>',summary:'Fixture only',category:'scholarships',host_countries:['DE'],eligible_countries:[],source:'fixture',url:'https://example.org/real',language:'de',status:'unknown'})),sources:[{source:'fixture',name:'Fixture Publisher',website_url:'https://example.org'}]}));const result=await build({input,out});assert.equal(result.records,31);assert.ok(result.routes.includes('/countries/de/'));assert.ok(result.routes.includes('/opportunities/scholarships/page/2/'));const html=await fs.readFile(path.join(out,'opportunity/test-0/index.html'),'utf8');assert.ok(html.includes('https://example.org/real'));assert.ok(html.includes('Not provided — check the source'));assert.ok(html.includes('lang="de"'));assert.ok(html.includes('&lt;script&gt;'));assert.ok(!html.includes('<script>alert'));const list=await fs.readFile(path.join(out,'opportunities/index.html'),'utf8');assert.equal((list.match(/class="opportunity"/g)||[]).length,30);assert.ok(list.includes('rel="canonical"'));await fs.rm(dir,{recursive:true,force:true});});

test('rejects unsupported catalog versions',async()=>{const dir=await fs.mkdtemp(path.join(os.tmpdir(),'youthopp-invalid-'));const input=path.join(dir,'catalog.json');await fs.writeFile(input,JSON.stringify({schema_version:999,opportunities:[{}],sources:[]}));await assert.rejects(()=>build({input,out:path.join(dir,'out')}),/Unsupported catalog schema/);await fs.rm(dir,{recursive:true,force:true});});
test('project Pages subpath prefixes every internal asset and navigation URL',async()=>{const dir=await fs.mkdtemp(path.join(os.tmpdir(),'youthopp-subpath-'));const result=await build({out:dir,config:{url:'https://example.org/project/'}});const html=await fs.readFile(path.join(dir,'index.html'),'utf8');assert.ok(html.includes('href="/project/opportunities/"'));assert.ok(html.includes('src="/project/assets/logo.svg"'));assert.ok(html.includes('href="/project/assets/style.css"'));assert.ok(html.includes('https://example.org/project/'));assert.ok(!/\b(?:href|src)="\/(?!project\/)/.test(html));const sitemap=await fs.readFile(path.join(dir,'sitemap.xml'),'utf8');assert.ok(sitemap.includes('https://example.org/project/docs/'));assert.ok(result.routes.includes('/'));await fs.rm(dir,{recursive:true,force:true});});

test('project identity, catalog breadcrumbs and social metadata use the configured public endpoint',async()=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'youthopp-discovery-'));
 try{
  await build({out:dir,config:{url:'https://example.org/project',description:'A source-first <script>index</script>'}});
  const html=await fs.readFile(path.join(dir,'opportunities/scholarships/unknown/index.html'),'utf8');
  const graph=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  const project=graph.find(n=>n['@type']==='Organization');const website=graph.find(n=>n['@type']==='WebSite');
  assert.equal(project.url,'https://example.org/project/');assert.equal(website.publisher['@id'],project['@id']);
  assert.equal(project.nonprofitStatus,undefined);
  const breadcrumbs=graph.find(n=>n['@type']==='BreadcrumbList').itemListElement;
  assert.deepEqual(breadcrumbs.map(n=>n.name),['Home','Opportunities','Scholarships','Scholarships — location not provided']);
  assert.deepEqual(breadcrumbs.map(n=>n.position),[1,2,3,4]);
  assert.ok(breadcrumbs.every(n=>n.item.startsWith('https://example.org/project/')));
  assert.ok(html.includes('name="twitter:image" content="https://example.org/project/assets/social-preview.png"'));
  assert.ok(html.includes('property="og:image:alt"'));assert.ok(html.includes('name="twitter:description"'));
  const doc=await fs.readFile(path.join(dir,'docs/ai-governance/index.html'),'utf8');
  const docGraph=JSON.parse(doc.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
  assert.equal(docGraph.find(n=>n['@type']==='BreadcrumbList').itemListElement[1].item,'https://example.org/project/docs/');
 }finally{await fs.rm(dir,{recursive:true,force:true});}
});

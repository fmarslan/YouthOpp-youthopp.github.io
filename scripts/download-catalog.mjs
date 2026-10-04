import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const execFileAsync=promisify(execFile);

export function validateManifest(manifest){
 if(manifest?.schema_version!==1||!/^catalog-\d+-\d+$/.test(manifest?.release_tag||''))throw new Error('Invalid catalog manifest version or immutable release tag');
 const asset=manifest.assets?.['catalog.json'];
 if(!asset||!/^[a-f0-9]{64}$/.test(asset.sha256||'')||!Number.isSafeInteger(asset.size)||asset.size<1)throw new Error('Invalid catalog manifest integrity metadata');
 return {releaseTag:manifest.release_tag,sha256:asset.sha256,size:asset.size};
}
export function verifyCatalog(bytes,manifest){
 const asset=validateManifest(manifest);
 if(bytes.length!==asset.size)throw new Error('Catalog byte-size mismatch');
 if(createHash('sha256').update(bytes).digest('hex')!==asset.sha256)throw new Error('Catalog SHA-256 mismatch');
 return asset;
}
export async function downloadCatalog({repository=process.env.DATA_REPOSITORY||'fmarslan/YouthOpp-data-pipeline',out='data/catalog.json',download}={}){
 if(!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository))throw new Error('Invalid data repository');
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'youthopp-release-'));
 const fetchAsset=download||((tag,asset,dest)=>execFileAsync('gh',['release','download',tag,'--repo',repository,'--pattern',asset,'--dir',dest]));
 try{
  await fetchAsset('catalog-latest','manifest.json',dir);
  const manifest=JSON.parse(await fs.readFile(path.join(dir,'manifest.json'),'utf8'));
  const {releaseTag}=validateManifest(manifest);
  await fetchAsset(releaseTag,'catalog.json',dir);
  const bytes=await fs.readFile(path.join(dir,'catalog.json'));
  verifyCatalog(bytes,manifest);
  await fs.mkdir(path.dirname(out),{recursive:true});await fs.writeFile(out,bytes);
  console.log(`Verified ${bytes.length} catalog bytes from ${repository}@${releaseTag}`);
  return {releaseTag,bytes:bytes.length};
 }finally{await fs.rm(dir,{recursive:true,force:true});}
}
if(process.argv[1]===fileURLToPath(import.meta.url))await downloadCatalog();

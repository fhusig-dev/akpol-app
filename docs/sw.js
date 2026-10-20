'use strict';
const CACHE='akpol-shell-v04-2';
const ASSETS=['./','./index.html','./style.css','./app.js','./features.js','./costs.js','./config.js','./qrcode.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('akpol-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;const base=new URL('./',self.location.href),allowed=ASSETS.map(p=>new URL(p,base).pathname);if(!allowed.includes(u.pathname))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(new Request(u.origin+u.pathname),copy))}return r}).catch(()=>caches.match(u.origin+u.pathname)))});

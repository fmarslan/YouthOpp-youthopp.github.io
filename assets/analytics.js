// Tracking is only enabled after an explicit opt-in and a configured identifier.
const analyticsId=document.currentScript?.dataset.id;
const siteName=document.currentScript?.dataset.siteName||'this site';
const basePath=document.currentScript?.dataset.base||'';
if(/^G-[A-Z0-9]+$/.test(analyticsId||'')){
 const panel=document.createElement('div');panel.className='analytics-consent';panel.setAttribute('role','region');panel.setAttribute('aria-label','Optional analytics');
 const enable=()=>{window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config',analyticsId,{anonymize_ip:true});const script=document.createElement('script');script.src=`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;script.async=true;document.head.append(script);};
 let choice;try{choice=localStorage.getItem('youthopp-analytics')}catch{}
 if(choice==='allow')enable();else if(choice!=='deny'){panel.innerHTML=`<p>Allow optional Google Analytics to help improve this site? <a href="${basePath}/docs/privacy/">Privacy details</a></p><button type="button" data-choice="deny">Decline</button><button type="button" data-choice="allow">Allow analytics</button>`;panel.querySelector('p').firstChild.textContent=`Allow optional Google Analytics to help improve ${siteName}? `;panel.addEventListener('click',event=>{const selected=event.target.dataset.choice;if(!selected)return;try{localStorage.setItem('youthopp-analytics',selected)}catch{}panel.remove();if(selected==='allow')enable();});document.body.append(panel);}
}

let SearchService=(()=>{let n={queryText:null},r,o,c;return n.template=`<div id="u-search">
  <div class="modal">
    <header class="modal-header" class="clearfix">
      <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit">
        <span class="fa-light fa-search"></span>
      </button>
      <div id="algolia-search-input"></div>
      <a id="u-search-btn-close" class="btn-close"> <span class="fa-light fa-times"></span> </a>
    </header>
    <main class="modal-body">
      <div id="algolia-search-results">
        <div id="algolia-hits">
          <div class="search-icon"><i class="fa-sharp fa-light fa-telescope"></i></i></div>
        </div>
      </div>
    </main>
    <footer>
      <div id="algolia-pagination"></div>
      <hr>
      <div id="algolia-info">
        <div class="algolia-stats"></div>
        <div class="algolia-poweredBy"></div>
      </div>
    </footer>
  </div>
  <div id="modal-overlay" class="modal-overlay"></div>
  </div>
  `,n.init=()=>{var e=document.createElement("div");e.innerHTML+=n.template,document.body.append(e),(o=volantis.GLOBAL_CONFIG.search).appId&&o.apiKey&&o.indexName?(n.event(),n.setAlgolia()):(document.querySelector("#u-search main.modal-body").innerHTML="Algolia setting is invalid!",document.querySelector("#u-search main.modal-body").style.textAlign="center",document.querySelector("#u-search .modal").style.maxHeight="128px")},n.event=()=>{document.querySelector("#u-search-btn-close").addEventListener("click",n.close,!1),document.querySelector("#modal-overlay").addEventListener("click",n.close,!1),document.querySelectorAll(".u-search-form").forEach(e=>{e.addEventListener("submit",n.onSubmit,!1)}),document.querySelector("#algolia-search-input").addEventListener("input",e=>{var t=e.target.querySelector(".ais-SearchBox-input");n.queryText=(t||e.target).value})},n.setAlgolia=()=>{r=instantsearch({indexName:o.indexName,searchClient:algoliasearch(o.appId,o.apiKey),searchFunction(e){e.state.query&&e.search()}});var e=instantsearch.widgets.configure({hitsPerPage:o.hitsPerPage}),t=instantsearch.widgets.searchBox({container:"#algolia-search-input",autofocus:!0,showReset:!1,showSubmit:!1,showLoadingIndicator:!1,searchAsYouType:o.searchAsYouType,placeholder:o.placeholder,templates:{input:"algolia-input"},queryHook(e,t){clearTimeout(c),c=setTimeout(()=>t(e),500)}}),a=instantsearch.widgets.hits({container:"#algolia-hits",templates:{item(e){var t=n.queryText?"?keyword="+n.queryText:"",a=e.permalink||""+volantis.GLOBAL_CONFIG.root+e.path,e=e._highlightResult,i=e.contentStripTruncate?n.cutContent(e.contentStripTruncate.value):e.contentStrip?n.cutContent(e.contentStrip.value):e.content?n.cutContent(e.content.value):"";return`
            <a href="${a}${t}" class="result">
            <span class="title">${e.title.value||"no-title"}</span>
            <span class="digest">${i}</span>
            </a>`},empty:function(e){return`<div id="resule-hits-empty"><i class="fa-light fa-box-alt"></i><p>${volantis.GLOBAL_CONFIG.languages.search.hits_empty.replace(/\$\{query}/,e.query)}</p></div>`}}}),i=instantsearch.widgets.stats({container:"#algolia-info > .algolia-stats",templates:{text:function(e){return""+volantis.GLOBAL_CONFIG.languages.search.hits_stats.replace(/\$\{hits}/,e.nbHits).replace(/\$\{time}/,e.processingTimeMS)}}}),s=instantsearch.widgets.poweredBy({container:"#algolia-info > .algolia-poweredBy",theme:"dark"===volantis.dark?.mode?"dark":"light"}),l=instantsearch.widgets.pagination({container:"#algolia-pagination",totalPages:5,templates:{first:'<i class="fas fa-angle-double-left"></i>',last:'<i class="fas fa-angle-double-right"></i>',previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'}});r.addWidgets([e,t,a,i,s,l]),r.start()},n.setQueryText=e=>{n.queryText=e,r||n.init(),r?.setUiState({[o.indexName]:{query:e}})},n.search=()=>{document.querySelector("#u-search").style.display="block",document.addEventListener("keydown",e=>{"Escape"===e.code&&n.close()},{once:!0})},n.onSubmit=e=>{e.preventDefault();var t=e.target.querySelector(".u-search-input");n.setQueryText((t?.value?t:e.target).value),n.search()},n.cutContent=e=>{if(""===e)return"";var t=e.indexOf("<mark>");let a=t-30,i=t+120,s="",l="";return a<=0?(a=0,i=140):s="...",i>e.length?i=e.length:l="...",s+e.substring(a,i)+l},n.close=()=>{document.querySelector("#u-search").style.display="none"},{init:n.init,setQueryText:e=>{n.setQueryText(e)},search:n.search,close:n.close}})();Object.freeze(SearchService),SearchService.init();
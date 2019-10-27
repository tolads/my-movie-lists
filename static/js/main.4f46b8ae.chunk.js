(window["webpackJsonpmy-movie-lists"]=window["webpackJsonpmy-movie-lists"]||[]).push([[0],{85:function(e,t,a){e.exports=a(98)},98:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a.n(i),c=a(12),o=a.n(c),l=a(28),r=a(25),s=a(66),m=a(74),d=a(42),v=a(162);const u=Object(v.a)({ADD_LIST:()=>({id:Date.now()}),RENAME_LIST:(e,t)=>({id:e,label:t}),DELETE_LIST:e=>({id:e}),SET_ACTIVE_LIST:e=>({id:e}),ADD_MOVIE_TO_ACTIVE_LIST:e=>({movieId:e}),REMOVE_MOVIE_FROM_ACTIVE_LIST:e=>({movieId:e}),MOVE_MOVIE_UP_IN_ACTIVE_LIST:e=>({movieId:e}),MOVE_MOVIE_DOWN_IN_ACTIVE_LIST:e=>({movieId:e})}),E=u.addList,b=u.addMovieToActiveList,h=u.deleteList,p=u.moveMovieDownInActiveList,g=u.moveMovieUpInActiveList,y=u.removeMovieFromActiveList,I=u.renameList,O=u.setActiveList,f=Date.now(),w={items:[{id:f,label:"Favourites",movies:["tt0111161"]},{id:2,label:"Watchlist",movies:[]}],active:f};var S=Object(d.a)((e=w,t)=>{const a=t.payload,i=t.type,n=e.items.find(t=>t.id===e.active);switch(i){case E.toString():e.active=a.id,e.items.push({id:a.id,label:"",movies:[]});break;case I.toString():e.items.find(e=>e.id===a.id).label=a.label;break;case h.toString():e.items=e.items.filter(e=>e.id!==a.id),e.active===a.id&&(e.active=e.items.length?e.items[0].id:void 0);break;case O.toString():e.active=a.id;break;case b.toString():n.movies.every(e=>e!==a.movieId)&&n.movies.push(a.movieId);break;case y.toString():n.movies=n.movies.filter(e=>e!==a.movieId);break;case g.toString():{const e=n.movies,t=e.indexOf(a.movieId);n.movies=0===t?[...e.slice(1),e[0]]:[...e.slice(0,t-1),e[t],e[t-1],...e.slice(t+1)];break}case p.toString():{const e=n.movies,t=e.indexOf(a.movieId);t===e.length-1?n.movies=[e[e.length-1],...e.slice(0,-1)]:n.movies=[...e.slice(0,t),e[t+1],e[t],...e.slice(t+2)];break}default:return e}});const k=Object(v.a)({SET_IS_SEARCH_FETCHING:e=>({isFetching:e}),MOVIE_SEARCH_RESULT_RECEIVED:(e,t)=>({key:e,movies:t}),MOVIE_RECEIVED:e=>({movie:e}),SET_SEARCH_VALUE:e=>({value:e}),FETCH_MOVIE:e=>({id:e})}),j=k.fetchMovie,L=k.movieReceived,D=k.movieSearchResultReceived,_=k.setIsSearchFetching,C=k.setSearchValue,M={items:{tt0111161:{poster:"https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",title:"The Shawshank Repemption",year:"1994",genre:"Drama",imdbId:"tt0111161",rating:"9.3"}},searchKeys:{},currentSearchValue:"",isSearchFetching:!1};var T=Object(d.a)((e=M,t)=>{const a=t.payload;switch(t.type){case _.toString():e.isSearchFetching=a.isFetching;break;case D.toString():e.searchKeys[a.key]=a.movies;break;case L.toString():e.items[a.movie.imdbId]=a.movie;break;case C.toString():e.currentSearchValue=a.value;break;default:return e}}),N=Object(r.c)({lists:S,movies:T}),V=a(17);const A=e=>window.fetch(e).then(e=>e.ok?e.json():Promise.reject(e)),F=e=>({genre:e.Genre,imdbId:e.imdbID,poster:e.Poster,rating:e.imdbRating,title:e.Title,year:e.Year}),R=e=>A("https://www.omdbapi.com/?apikey=".concat("de26953c","&type=movie&s=").concat(e)).then(({Search:e})=>e?e.map(F):[]),x=e=>A("https://www.omdbapi.com/?apikey=".concat("de26953c","&type=movie&i=").concat(e)).then(F);var P=a(67);const B=e=>e.lists.items,H=e=>e.lists.active,U=e=>void 0!==H(e),z=e=>e.movies.items,G=Object(P.a)(B,H,z,(e,t,a)=>void 0===t?[]:e.find(({id:e})=>e===t).movies.map(e=>{return a[e]||{imdbId:e}})),W=(e,{key:t})=>e.movies.searchKeys[t],X=e=>e.movies.currentSearchValue,Y=e=>{const t=X(e),a=W(e,{key:t.trim()});return a?a.map(({title:e,year:t,imdbId:a})=>({value:a,label:"".concat(e," (").concat(t,")")})):[]},K=e=>e.movies.isSearchFetching;function*Z(e){const t=e.payload.value.trim(),a=W(yield Object(V.f)(),{key:t});if(t.length<3||a)yield Object(V.d)(_(!1));else if(yield Object(V.d)(_(!0)),!(yield Object(V.e)({cancel:Object(V.g)(e.type),timeout:Object(V.c)(400)})).cancel)try{const e=yield Object(V.b)(R,t);yield Object(V.d)(D(t,e))}catch(i){console.error(i)}finally{yield Object(V.d)(_(!1))}}function*$(){yield Object(V.h)(C.toString(),Z)}function*J(e){const t=e.payload.id;if(yield Object(V.d)(b(t)),!z(yield Object(V.f)())[t])try{const e=yield Object(V.b)(x,t);yield Object(V.d)(L(e))}catch(a){console.error(a)}}function*q(){yield Object(V.h)(j.toString(),J)}function*Q(){yield Object(V.a)([$(),q()])}var ee=e=>{const t=Object(m.a)(),a=Object(s.createLogger)({collapsed:!0}),i=Object(r.e)(N,e,Object(r.a)(t,a));return t.run(Q),i},te=a(68),ae=a(156),ie=a(161),ne=a(158),ce=a(155),oe=a(159),le=a(149),re=a(157),se=a(39),me=a(140),de=a(141);var ve=({children:e})=>{const t=Object(me.a)();return n.a.createElement(de.a,{appear:!1,direction:"down",in:!t},e)},ue=a(69),Ee=a.n(ue),be=a(148),he=a(145),pe=a(99),ge=a(45),ye=a.n(ge),Ie=a(143),Oe=a(147),fe=a(146),we=a(160);const Se=Object(te.a)(()=>({item:{height:48,"&:hover $deleteButton":{opacity:1}},button:{height:48},activeItem:{backgroundColor:"#EDEDED"},edit:{width:"100%"},textField:{margin:0,width:"100%"},input:{"&::before":{borderBottomColor:"transparent"}},deleteButton:{opacity:0,"&:focus":{opacity:1}}}));var ke=({active:e,deleteList:t,isNewItem:a,label:c,renameList:o,setActiveList:l})=>{const r=Se(),s=Object(i.useRef)(null);Object(i.useEffect)(()=>{s&&s.current&&a&&s.current.focus()});return n.a.createElement(Ie.a,{button:!e,ContainerProps:{className:"".concat(r.item," ").concat(e?r.activeItem:"")},classes:{button:r.button},onClick:e?void 0:l},e?n.a.createElement(ie.a,{className:r.edit},n.a.createElement(we.a,{className:r.textField,InputProps:{className:r.input},inputRef:s,onChange:e=>o(e.target.value),placeholder:"(new list)",value:c})):n.a.createElement(fe.a,{primary:c||"(new list)"}),n.a.createElement(Oe.a,null,n.a.createElement(be.a,{"aria-label":"delete",className:r.deleteButton,"data-test-id":"delete-btn",edge:"end",onClick:t},n.a.createElement(ye.a,null))))};const je=Object(te.a)(()=>({header:{display:"flex",justifyContent:"space-between",alignItems:"center"}})),Le=({activeList:e,addList:t,deleteList:a,lists:c,renameList:o,setActiveList:l})=>{const r=je(),s=Object(i.useRef)();return Object(i.useEffect)(()=>{s.current=c}),n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:r.header},n.a.createElement(se.a,{variant:"subtitle1"},"My lists"),n.a.createElement(be.a,{color:"primary","data-test-id":"create-list-btn",onClick:t},n.a.createElement(Ee.a,null))),n.a.createElement(pe.a,null,n.a.createElement(he.a,{component:"nav","data-test-id":"lists-list"},c.map(({id:t,label:i})=>n.a.createElement(ke,{key:t,active:t===e,deleteList:()=>a(t),id:t,isNewItem:Boolean(s&&s.current&&s.current.every(e=>e.id!==t)),label:i,renameList:e=>o(t,e),setActiveList:()=>l(t)})))))};Le.defaultProps={activeList:void 0};const De={addList:E,deleteList:h,renameList:I,setActiveList:O};var _e=Object(l.b)(e=>({activeList:H(e),lists:B(e)}),De)(Le),Ce=a(71),Me=a.n(Ce),Te=a(70),Ne=a.n(Te),Ve=a(150),Ae=a(154),Fe=a(153),Re=a(151),xe=a(152);const Pe=Object(te.a)(()=>({root:{overflow:"auto"},row:{height:96,"&:hover":{backgroundColor:"#EDEDED"},"&:focus-within":{backgroundColor:"#EDEDED"},"&:hover $icons":{opacity:1,backgroundColor:"#EDEDED"},"&:focus-within $icons":{opacity:1,backgroundColor:"#EDEDED"}},loading:{opacity:.4,backgroundColor:"rgba(0, 0, 0, .2)"},cell:{padding:"8px 12px"},button:{padding:6},iconCell:{position:"relative",overflow:"hidden"},icons:{position:"absolute",left:0,transform:"translate(0, calc(-50% - 1em + 4px))",display:"flex",flexDirection:"column",opacity:0}})),Be={moveDown:p,moveUp:g,remove:y};var He=Object(l.b)(e=>({movies:G(e)}),Be)(({moveDown:e,moveUp:t,movies:a,remove:i})=>{const c=Pe(),o=[{header:"#",className:c.iconCell,content:(a,o)=>n.a.createElement(n.a.Fragment,null,o+1,n.a.createElement("div",{className:c.icons},n.a.createElement(be.a,{className:c.button,"data-test-id":"move-up-btn",onClick:()=>t(a.imdbId)},n.a.createElement(Ne.a,{fontSize:"small"})),n.a.createElement(be.a,{className:c.button,"data-test-id":"remove-btn",onClick:()=>i(a.imdbId)},n.a.createElement(ye.a,{fontSize:"small"})),n.a.createElement(be.a,{className:c.button,"data-test-id":"move-down-btn",onClick:()=>e(a.imdbId)},n.a.createElement(Me.a,{fontSize:"small"}))))},{header:"Poster",content:e=>n.a.createElement("img",{src:e.poster,alt:"",width:"50"})},{header:"Title",content:e=>e.title},{header:"Year",content:e=>e.year},{header:"Genre",content:e=>e.genre},{header:"IMDb",content:e=>n.a.createElement(le.a,{href:"https://www.imdb.com/title/".concat(e.imdbId,"/")},e.imdbId)},{header:"Rating",content:e=>e.rating}];return n.a.createElement(pe.a,{className:c.root},n.a.createElement(Ve.a,{"data-test-id":"movies-table",stickyHeader:!0},n.a.createElement(Re.a,null,n.a.createElement(xe.a,null,o.map(({header:e})=>n.a.createElement(Fe.a,{key:e,className:c.cell},e)))),n.a.createElement(Ae.a,null,a.map((e,t)=>n.a.createElement(xe.a,{key:e.imdbId,className:"".concat(c.row," ").concat(void 0===e.title?c.loading:"")},o.map(({className:a,content:i,header:o})=>n.a.createElement(Fe.a,{key:o,className:"".concat(c.cell," ").concat(a||"")},i(e,t))))))))}),Ue=a(73);const ze={fetchMovie:j,setValue:C};var Ge=Object(l.b)(e=>({showSearch:U(e),isLoading:K(e),options:Y(e),value:X(e)}),ze)(({fetchMovie:e,showSearch:t,isLoading:a,options:i,setValue:c,value:o})=>{return t?n.a.createElement(ie.a,{my:2,"data-test-id":"search-container"},n.a.createElement(Ue.a,{filterOption:null,isLoading:a,onChange:t=>{e(t.value)},onInputChange:e=>{c(e)},options:i,placeholder:"Add a movie",value:o})):null});const We=Object(te.a)(()=>({content:{minHeight:"calc(100vh - ".concat(40,"px)")},footer:{height:40,display:"flex",justifyContent:"center",alignItems:"center"}}));var Xe=()=>{const e=We();return n.a.createElement(n.a.Fragment,null,n.a.createElement(ce.a,null),n.a.createElement(ve,null,n.a.createElement(ae.a,null,n.a.createElement(re.a,null,n.a.createElement(se.a,{variant:"h6"},"My movie lists")))),n.a.createElement("div",{className:e.content},n.a.createElement(re.a,null),n.a.createElement(ne.a,null,n.a.createElement(ie.a,{my:2},n.a.createElement(oe.a,{container:!0,spacing:3},n.a.createElement(oe.a,{item:!0,xs:12,md:4,lg:3},n.a.createElement(_e,null)),n.a.createElement(oe.a,{item:!0,xs:12,md:8,lg:9},n.a.createElement(He,null),n.a.createElement(Ge,null)))))),n.a.createElement("div",{className:e.footer},n.a.createElement("p",null,"The site uses ",n.a.createElement(le.a,{href:"http://www.omdbapi.com/"},"OMDb API"),".")))};const Ye=ee();o.a.render(n.a.createElement(l.a,{store:Ye},n.a.createElement(Xe,null)),document.getElementById("root"))}},[[85,1,2]]]);
//# sourceMappingURL=main.4f46b8ae.chunk.js.map
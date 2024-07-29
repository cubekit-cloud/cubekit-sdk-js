import e from"axios";var t,a,s,i,o,n,r,p,d,h,c,u;!function(e){e.SYNC="sync",e.ATTACH="attach",e.DETACH="detach"}(t||(t={})),function(e){e.EQUAL="=",e.INEQUAL="!=",e.LIKE="like",e.ILIKE="ilike",e.MORE=">",e.MORE_OR_EQUAL=">=",e.LESS="<",e.LESS_OR_EQUAL="<="}(a||(a={})),function(e){e.POINTER="pointer",e.SCALAR="scalar"}(s||(s={})),function(e){e.AND="and",e.OR="or"}(i||(i={})),function(e){e.GROUP="group",e.SINGLE="single"}(o||(o={})),function(e){e.LEFT="left",e.RIGHT="right",e.FULL="full",e.INNER="inner"}(n||(n={})),function(e){e.ASC="asc",e.DESC="desc"}(r||(r={})),function(e){e.FIRST="first",e.LAST="last"}(p||(p={})),function(e){e.RESOURCE="resource",e.EXPORT="export"}(d||(d={})),function(e){e.XLSX="xlsx",e.CSV="csv"}(h||(h={})),function(e){e.UTF_8="utf-8",e.WINDOWS_1251="windows-1251"}(c||(c={})),function(e){e.SEARCH="search",e.GET_BY_ID="get_by_id",e.CREATE="create",e.UPDATE="update",e.DELETE="delete"}(u||(u={}));const l="{key}";class E{axios;constructor(t){this.axios=e.create({baseURL:t.baseUrl,withCredentials:!0,headers:{"x-api-key":t.serviceKey}})}setConfig(e){this.axios.defaults.baseURL=e.baseUrl,this.axios.defaults.headers["x-api-key"]=e.serviceKey}setAuthorizationHeader(e){this.axios.defaults.headers.Authorization=e}send(e){switch(e.method){case u.GET_BY_ID:return this.getById(e);case u.CREATE:return this.create(e);case u.UPDATE:return this.update(e);case u.DELETE:return this.delete(e);default:return this.search(e)}}preparePathWithId(e,t){return e=e.indexOf(l)>-1?e.replace(l,t):"/"===e.slice(-1)?`${e}${t}`:`${e}/${t}`}search(e){let t=e.path;const a=e.options;return a.pagination&&(t+="?",a.pagination.limit&&(t=`${t}limit=${a.pagination.limit}&`),a.pagination.page&&(t=`${t}page=${a.pagination.page}`)),delete a.pagination,this.axios.post(t,a)}getById(e){const t=e.options;return this.axios.post(this.preparePathWithId(e.path,t.id),t)}create(e){return this.axios.post(e.path,e.options)}update(e){const t=e.options;return this.axios.put(this.preparePathWithId(e.path,t.id),e.options)}delete(e){const t=e.options;return this.axios.delete(this.preparePathWithId(e.path,t.id),{data:e.options})}}class f{axios;constructor(t){this.axios=e.create({baseURL:t.baseUrl,withCredentials:!0,headers:{"x-api-key":t.serviceKey}})}setConfig(e){this.axios.defaults.baseURL=e.baseUrl,this.axios.defaults.headers["x-api-key"]=e.serviceKey}setAuthorizationHeader(e){this.axios.defaults.headers.Authorization=e}getFolderTree(e){return this.axios.get(`/trees?path=${encodeURIComponent(e||"/")}`).then((e=>e.data.data))}view(e,t,a,s,i){const o=new URLSearchParams;return o.append("path",e||"/"),t&&o.append("order_by",t),a&&o.append("order",a),s&&o.append("filter_by",s),i&&o.append("filter",i),this.axios.get(`/objects?${o.toString()}`).then((e=>e.data.data))}createDirectory(e){return this.axios.put(`/objects/${encodeURIComponent(e)}`).then((e=>e.data))}delete(e){return this.axios.delete("/delete",{data:e}).then((e=>e.data))}upload(e,t,a,s){const i=new FormData;return i.append("objects_path",e),t.forEach((e=>{i.append("files",e)})),this.axios.put("/objects",i,{onUploadProgress:a,signal:s,headers:{"Content-Type":"multipart/form-data"}}).then((e=>e.data))}resend(e){return this.axios.request(e).then((e=>e.data))}simpleUpload(e,t,a,s){const i=new FormData;return i.append("objects_path",e),t.forEach((e=>{i.append("files",e)})),this.axios.post("/objects",i,{onUploadProgress:a,signal:s,headers:{"Content-Type":"multipart/form-data"}}).then((e=>e.data))}move(e,t){return this.axios.post(`/objects/${encodeURIComponent(e)}`,{target:t}).then((e=>e.data))}download(e,t){return this.axios.post(`/bulkDownloads?objects_path=${encodeURIComponent(e)}`,t,{responseType:"blob"})}}export{E as CubekitOrmClient,f as CubekitStorageClient,c as ExportEncodingTypesEnum,h as FileExportTypesEnum,i as FilterBooleansEnum,o as FilterTypesEnum,s as FilterValueTypesEnum,n as JoinTypesEnum,a as OperatorsEnum,r as OrderDirectionsEnum,p as OrderNullPositionsEnum,t as RelationsModesEnum,u as RequestOrmMethodsEnum,d as ResponseTypeEnum};
//# sourceMappingURL=index.js.map

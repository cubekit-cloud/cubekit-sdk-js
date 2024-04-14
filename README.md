# Cubekit Client SDK
> @cubekit-cloud/cubekit-sdk-js - the library for working with auto generated API from cubekit.com. This SDK uses axios to send requests.

## Table of Contents
- [Install](#install)
- [Initialization](#initialization)
  - [CubekitOrmClient](#CubekitOrmClient)
  - [CubekitStorageClient](#CubekitStorageClient)

<a name="CubekitOrmClient"></a>

## CubekitOrmClient
```ts
	// CubekitOrmClient is needed for working with auto generated ORM API
	import { IOrmClientConfig, CubekitOrmClient } from '@cubekit-cloud/cubekit-sdk-js';
	// You can get your configuration from your application page.
	const config: IOrmClientConfig = {
		baseUrl: 'url';
		serviceKey: 'key';
	};
	const ormClient = new CubekitOrmClient(config);
	ormClient.send({...});```

**Kind**: global class  

* [CubekitOrmClient](#CubekitOrmClient)
    * [~setConfig(config)](#CubekitOrmClient..setConfig)
    * [~setAuthorizationHeader(value)](#CubekitOrmClient..setAuthorizationHeader)
    * [~send(params)](#CubekitOrmClient..send) ⇒ <code>Promise.&lt;AxiosResponse.&lt;IResponse.&lt;T2&gt;, any&gt;&gt;</code>

<a name="CubekitOrmClient..setConfig"></a>

### CubekitOrmClient~setConfig(config)
Set new configuration

**Kind**: inner method of [<code>CubekitOrmClient</code>](#CubekitOrmClient)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>IOrmClientConfig</code> | an object with new configuration |

**Example**  
```js
const config: IOrmClientConfig = { baseUrl: '/'; serviceKey: 'xxxx-xxxx-xxxx-xxxx';}ormClient.setConfig(config);
```
<a name="CubekitOrmClient..setAuthorizationHeader"></a>

### CubekitOrmClient~setAuthorizationHeader(value)
Set authorization header

**Kind**: inner method of [<code>CubekitOrmClient</code>](#CubekitOrmClient)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | a string with auth data |

**Example**  
```js
ormClient.setAuthorizationHeader('Basic YWxhZGRpbjpvcGVuc2VzYW1l');
```
<a name="CubekitOrmClient..send"></a>

### CubekitOrmClient~send(params) ⇒ <code>Promise.&lt;AxiosResponse.&lt;IResponse.&lt;T2&gt;, any&gt;&gt;</code>
Send request to API cubkit.com with params.

**Kind**: inner method of [<code>CubekitOrmClient</code>](#CubekitOrmClient)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>IOrmRequestParameter.&lt;T&gt;</code> | A generic object containing all the necessary parameters for successful request. |
| params.path | <code>string</code> | Path to a exactly model in your application. It can be got from documentation on main page of your application. |
| params.method | <code>RequestOrmMethodsEnum</code> | Request type. |
| params.options | <code>ISearchOptions.&lt;T&gt;</code> \| <code>IGetByIdOptions.&lt;T&gt;</code> \| <code>ICreateOptions.&lt;T&gt;</code> \| <code>IUpdateOptions.&lt;T&gt;</code> \| <code>IDeleteOptions</code> | Data to be sent. |

**Example**  
```js
interface A {	id: string;}interface B extends A {	name: string;}ormClient.send<A, A>({}).then((response) => {...}) //response.data.data can be able to string | A | A[]ormClient.send<A, B>({}).then((response) => {...}) //response.data.data can be able to string | B | B[]
```
<a name="CubekitStorageClient"></a>

## CubekitStorageClient
```ts
	// CubekitStorageClient is needed for working with auto generated Storage API
	import { IStorageClientConfig, CubekitStorageClient } from '@cubekit-cloud/cubekit-sdk-js';
	// You can get your configuration from your application page.
	const config: IStorageClientConfig = {
		baseUrl: 'url';
		serviceKey: 'key';
		storageId: 'id';
	};
	const storageClient = new CubekitStorageClient(config);
	storageClient.upload({...});```

**Kind**: global class  
<a name="CubekitStorageClient.setConfig"></a>

### CubekitStorageClient.setConfig(config)
Set new configuration

**Kind**: static method of [<code>CubekitStorageClient</code>](#CubekitStorageClient)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>IStorageClientConfig</code> | an object with new configuration |

**Example**  
```js
const config: IStorageClientConfig = { baseUrl: '/'; serviceKey: 'xxxx-xxxx-xxxx-xxxx'; storageId: 'xxxx-xxxx-xxxx-xxxx';}storageClient.setConfig(config);
```

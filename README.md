# Cubekit Client SDK
> @cubekit-cloud/cubekit-sdk-js - the library for working with auto generated API from cubekit.com. This SDK uses axios to send requests.

## Table of Contents
- [Install](#install)
- [Initialization](#initialization)
- [Methods](#methods)
  - [setConfig](#setConfig)
  - [setAuthorizationHeader](#setAuthorizationHeader)
  - [send](#send)

## Quick start
### Install
#### npm
```shell
npm i @cubekit-cloud/cubekit-sdk-js
```
### Initialization
```ts
import CubekitOrmClient, { IClientConfig } from '@cubekit-cloud/cubekit-sdk-js';

// You can get your configuration from your application page.
const config: IClientConfig = {
	baseUrl: 'url';
	serviceKey: 'key';
};

const client = new CubekitOrmClient(config);

client.send({...});
```

## Methods

### setConfig

Set new configuration


#### Params
- `config`
  - Type: `IClientConfig`
  - Description: an object with new configuration


#### Example
```JS
const config: IClientConfig = { baseUrl: '/'; serviceKey: 'xxxx-xxxx-xxxx-xxxx';}client.setConfig(config);
```
* * *
### setAuthorizationHeader

Set authorization header


#### Params
- `value`
  - Type: `string`
  - Description: a string with auth data


#### Example
```JS
client.setAuthorizationHeader('Basic YWxhZGRpbjpvcGVuc2VzYW1l');
```
* * *
### send

Send request to API cubkit.com with params.


#### Params
- `params`
  - Type: `IRequestParameter.&lt;T&gt;`
  - Description: A generic object containing all the necessary parameters for successful request.
- `params.path`
  - Type: `string`
  - Description: Path to a exactly model in your application. It can be got from documentation on main page of your application.
- `params.method`
  - Type: `RequestMethodsEnum`
  - Description: Request type.
- `params.options`
  - Type: `ISearchOptions.&lt;T&gt;,IGetByIdOptions.&lt;T&gt;,ICreateOptions.&lt;T&gt;,IUpdateOptions.&lt;T&gt;,IDeleteOptions`
  - Description: Data to be sent.

#### Returns
- `Promise.&lt;AxiosResponse.&lt;IResponse.&lt;T2&gt;, any&gt;&gt;`

#### Example
```JS
interface A {	id: string;}interface B extends A {	name: string;}client.send<A, A>({}).then((response) => {...}) //response.data.data will be string | A | A[]client.send<A, B>({}).then((response) => {...}) //response.data.data will be string | B | B[]
```
* * *

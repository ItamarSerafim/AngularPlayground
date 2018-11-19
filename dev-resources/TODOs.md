Swagger: https://app.swaggerhub.com/apis/itamar-serafim/petstore/1.0.0#
x. take of HTTPClient import from list-menus-component.ts
x. Make sure auth interceptor and and fakebackendProvider injected in app.module is really worrking. If not so take if off.
x. Fix icons dropdown: In list-menus.component the input for choose and icon is not working.
x. list-menus.component is using native alert for item creation confirmation. Change it to another standart alert.
x. Stylize icon column in list-menus.component:
  text-align: center;
  background-color: #2da0ff;
  display: block;
  padding: 10px;
  border-radius: 50%;
  max-width: 25px;
  max-height: 25px;

x. In list-menus.component when canceling a dialog the grid is being refresh. It is not necessary if the action was canceled.
x. Continue with modules mapping: https://coggle.it/diagram/W_I9BYFGxBtRcRfQ/t/-


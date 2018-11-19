x. Adding a provider(fakeBackendProvider) in app.module it didnt work for site-navigation.module. Maybe bacause it is layloaded. I solved this problem by adding the provide directly in site-navigation.module.
x. You can and must import HttpClientModule only once.

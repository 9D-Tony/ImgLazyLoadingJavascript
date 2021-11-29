# ImgLazyLoadingJavascript
A pure javascript way to lazy load images without a server can be run by just dropping example html file into browser.

Works by getting the image tags which have a data-src tag instead of a src tag on them, then detecting the boundaries hit the scroll position + window.innerHeight and setting src on the image causing the iamges to be loaded.



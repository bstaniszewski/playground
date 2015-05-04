# Playground

Aplikacja na MEAN stack przygotowana do uruchomienia produkcyjnego na platformie Openshift

### Wersja
0.2.0

### Wymaga

* [Node.js] - w wersji >=0.12.2
* [Git]

### Instalacja

1. Odpal konsolê.
2. Utwórz i przejdŸ do folderu, do którego chcesz sklonowaæ projekt.
3. Wykonaj:
```sh
$ git init 
$ git clone https://github.com/bstaniszewski/playground.git
$ npm install
$ npm start
```
4. Konfiguracja Openshifta to zupe³nie inna historia, któr¹ opiszê póŸniej gdy sam bêdê pewien, ¿e wiem ju¿ odpowiednio du¿o

### Z czego korzysta³em

1. Do za³o¿enia projektu:
    1. Do za³o¿enia projektu skorzysta³em z generatora dla Angulara na MEAN Stack. Generator ma wbudowan¹ funkcjê inicjalizacji projektu na Openshifta, z którego ostatecznie nie skorzysta³em ale zajrza³em do kodu i u¿y³em go do rêcznej inicjalizacji Openshifta. Niewiele zosta³o z wygenerowanego projektu ale pos³u¿y³o jako baza do dalszej konfiguracji. Dlaczego wyrzuci³em znaczn¹ czêœæ wytworów generatora? W celach edukacyjnych i dla pe³nej kontroli, chcê wprowadziæ "zasadê zrób to sam!": https://github.com/DaftMonk/generator-angular-fullstack
    2. Ciekaw¹ alternatyw¹ s¹ pakiety instalacyjne z biblioteki openshifta: https://hub.openshift.com/quickstarts/languages/javascript
    3. Wykorzysta³em https://hub.openshift.com/quickstarts/128-node-js-0-12, z którego wyci¹gn¹³em jak uruchomiæ na Openshift node w wersji 0.12.2 (domyœlnie jest 0.10.24)

2. Do rozpoznania zagadnienia logowania:
    1. Post o tym jak korzystaæ z Winstona: http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
    2. Alternatywne opcje:
        * Morgan
        * Bunyan - porównanie Winstona i Bunyana: https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/
        * Do rozpoznania: log4js, log4javascript
        
3. Do rozpoznania zagadnienia obs³ugi b³êdów:
    1. Obs³uga b³êdów w Express - http://expressjs.com/guide/error-handling.html
    2. Niez³y wprowadzenie do obs³ugi b³edów wraz z przyk³adami: Mastering Web Application Development with Express - 2014 Packt Publishing, Rozdzia³ 6. - https://github.com/alessioalex/mastering_express_code/blob/master/chapter06/
    3. Jak prawid³owo zg³aszaæ b³êdy: http://derickbailey.com/2014/09/06/proper-error-handling-in-expressjs-route-handlers/
    4. Obs³uga b³êdów na Node.js - https://www.joyent.com/developers/node/design/errors
    
### TODO
1. DONE - Pod³¹czyæ logowanie dla wersji deweloperskiej i testowej
2. Pod³¹czyc logowanie dla wersji produkcyjnej (i rozpracowaæ temat logów na openshifta)
3. Dodaæ zadania Grunta do inicjalizacji projektu na Openshifta, zrobi³em to rêcznie:
```sh
git init
rhc app show DEPLOYED_APP_NAME --noprompt
rhc app create DEPLOYED_APP_NAME nodejs-0.10 --noprompt --no-git NODE_ENV=production
git remote add openshift DIST_REPO_URL
git add -A && git commit -m "Commit inicjalny"
git push -f openshift master
rhc app restart -a DEPLOYED_APP_NAME
```
4. Dopracowaæ komunikaty o b³êdach - patrz handleErrors

[git]:http://git-scm.com/
[node.js]:http://nodejs.org
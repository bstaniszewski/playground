# Playground

Aplikacja na MEAN stack przygotowana do uruchomienia produkcyjnego na platformie Openshift

### Wersja
0.2.0

### Wymaga

* [Node.js] - w wersji >=0.12.2
* [Git]

### Instalacja

1. Odpal konsol�.
2. Utw�rz i przejd� do folderu, do kt�rego chcesz sklonowa� projekt.
3. Wykonaj:
```sh
$ git init 
$ git clone https://github.com/bstaniszewski/playground.git
$ npm install
$ npm start
```
4. Konfiguracja Openshifta to zupe�nie inna historia, kt�r� opisz� p�niej gdy sam b�d� pewien, �e wiem ju� odpowiednio du�o

### Z czego korzysta�em

1. Do za�o�enia projektu:
    1. Do za�o�enia projektu skorzysta�em z generatora dla Angulara na MEAN Stack. Generator ma wbudowan� funkcj� inicjalizacji projektu na Openshifta, z kt�rego ostatecznie nie skorzysta�em ale zajrza�em do kodu i u�y�em go do r�cznej inicjalizacji Openshifta. Niewiele zosta�o z wygenerowanego projektu ale pos�u�y�o jako baza do dalszej konfiguracji. Dlaczego wyrzuci�em znaczn� cz�� wytwor�w generatora? W celach edukacyjnych i dla pe�nej kontroli, chc� wprowadzi� "zasad� zr�b to sam!": https://github.com/DaftMonk/generator-angular-fullstack
    2. Ciekaw� alternatyw� s� pakiety instalacyjne z biblioteki openshifta: https://hub.openshift.com/quickstarts/languages/javascript
    3. Wykorzysta�em https://hub.openshift.com/quickstarts/128-node-js-0-12, z kt�rego wyci�gn��em jak uruchomi� na Openshift node w wersji 0.12.2 (domy�lnie jest 0.10.24)

2. Do rozpoznania zagadnienia logowania:
    1. Post o tym jak korzysta� z Winstona: http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
    2. Alternatywne opcje:
        * Morgan
        * Bunyan - por�wnanie Winstona i Bunyana: https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/
        * Do rozpoznania: log4js, log4javascript
        
3. Do rozpoznania zagadnienia obs�ugi b��d�w:
    1. Obs�uga b��d�w w Express - http://expressjs.com/guide/error-handling.html
    2. Niez�y wprowadzenie do obs�ugi b�ed�w wraz z przyk�adami: Mastering Web Application Development with Express - 2014 Packt Publishing, Rozdzia� 6. - https://github.com/alessioalex/mastering_express_code/blob/master/chapter06/
    3. Jak prawid�owo zg�asza� b��dy: http://derickbailey.com/2014/09/06/proper-error-handling-in-expressjs-route-handlers/
    4. Obs�uga b��d�w na Node.js - https://www.joyent.com/developers/node/design/errors
    
### TODO
1. DONE - Pod��czy� logowanie dla wersji deweloperskiej i testowej
2. Pod��czyc logowanie dla wersji produkcyjnej (i rozpracowa� temat log�w na openshifta)
3. Doda� zadania Grunta do inicjalizacji projektu na Openshifta, zrobi�em to r�cznie:
```sh
git init
rhc app show DEPLOYED_APP_NAME --noprompt
rhc app create DEPLOYED_APP_NAME nodejs-0.10 --noprompt --no-git NODE_ENV=production
git remote add openshift DIST_REPO_URL
git add -A && git commit -m "Commit inicjalny"
git push -f openshift master
rhc app restart -a DEPLOYED_APP_NAME
```
4. Dopracowa� komunikaty o b��dach - patrz handleErrors

[git]:http://git-scm.com/
[node.js]:http://nodejs.org
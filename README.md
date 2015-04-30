# Playground

Aplikacja na MEAN stack przygotowana do uruchomienia produkcyjnego na platformie Openshift

### Wersja
0.1.0

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

1. Do za³o¿enia projektu skorzysta³em z generatora dla Angulara na MEAN Stack. Generator ma wbudowan¹ funkcjê inicjalizacji projektu na Openshifta, z którego ostatecznie nie skorzysta³em ale zajrza³em do kodu i u¿y³em go do rêcznej inicjalizacji Openshifta. Niewiele zosta³o z wygenerowanego projektu ale pos³u¿y³o jako baza do dalszej konfiguracji. Dlaczego wyrzuci³em znaczn¹ czêœæ wytworów generatora? W celach edukacyjnych i dla pe³nej kontroli, chcê wprowadziæ "zasadê zrób to sam!": https://github.com/DaftMonk/generator-angular-fullstack
2. Ciekaw¹ alternatyw¹ s¹ pakiety instalacyjne z biblioteki openshifta: https://hub.openshift.com/quickstarts/languages/javascript
3. Wykorzysta³em https://hub.openshift.com/quickstarts/128-node-js-0-12, z którego wyci¹gn¹³em jak uruchomiæ na Openshift node w wersji 0.12.2 (domyœlnie jest 0.10.24)

### TODO
1. Pod³¹czyæ logowanie dla wersji deweloperskiej i testowej
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

[git]:http://git-scm.com/
[node.js]:http://nodejs.org
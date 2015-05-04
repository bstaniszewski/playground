# Playground

Aplikacja na MEAN stack przygotowana do uruchomienia produkcyjnego na platformie Openshift

### Wersja
0.2.0

### Wymaga

* [Node.js] - w wersji >=0.12.2
* [Git]

### Aktualizacja stosu dla bieżącej wersji

1. Zaktualizuj aplikację:
    * odpal konsolę
    * przejdź do folderu z projektem
    ```sh
    $ git pull origin master
    $ npm install
    $ npm start
    ```
    
### Z czego korzystałem

1. Do założenia projektu:
    1. Do założenia projektu skorzystałem z generatora dla Angulara na MEAN Stack. Generator ma wbudowaną funkcję inicjalizacji projektu na Openshifta, z którego ostatecznie nie skorzystałem ale zajrzałem do kodu i użyłem go do ręcznej inicjalizacji Openshifta. Niewiele zostało z wygenerowanego projektu ale posłużyło jako baza do dalszej konfiguracji. Dlaczego wyrzuciłem znaczną część wytworów generatora? W celach edukacyjnych i dla pełnej kontroli, chcę wprowadzić "zasadę zrób to sam!": https://github.com/DaftMonk/generator-angular-fullstack
    2. Ciekawą alternatywą są pakiety instalacyjne z biblioteki openshifta: https://hub.openshift.com/quickstarts/languages/javascript
    3. Wykorzystałem https://hub.openshift.com/quickstarts/128-node-js-0-12, z którego wyciągnąłem jak uruchomić na Openshift node w wersji 0.12.2 (domyślnie jest 0.10.24)

2. Do rozpoznania zagadnienia logowania:
    1. Post o tym jak korzystać z Winstona: http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
    2. Alternatywne opcje:
        * Morgan
        * Bunyan - porównanie Winstona i Bunyana: https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/
        * Do rozpoznania: log4js, log4javascript
        
3. Do rozpoznania zagadnienia obsługi błędów:
    1. Obsługa błędów w Express - http://expressjs.com/guide/error-handling.html
    2. Niezły wprowadzenie do obsługi błedów wraz z przykładami: Mastering Web Application Development with Express - 2014 Packt Publishing, Rozdział 6. - https://github.com/alessioalex/mastering_express_code/blob/master/chapter06/
    3. Jak prawidłowo zgłaszać błędy: http://derickbailey.com/2014/09/06/proper-error-handling-in-expressjs-route-handlers/
    4. Obsługa błędów na Node.js - https://www.joyent.com/developers/node/design/errors

### TODO
1. DONE - Podłączyć logowanie dla wersji deweloperskiej i testowej
2. Podłączyc logowanie dla wersji produkcyjnej (i rozpracować temat logów na openshifta)
3. Dodać zadania Grunta do inicjalizacji projektu na Openshifta, zrobiłem to ręcznie:
    ```sh
    git init
    rhc app show DEPLOYED_APP_NAME --noprompt
    rhc app create DEPLOYED_APP_NAME nodejs-0.10 --noprompt --no-git NODE_ENV=production
    git remote add openshift DIST_REPO_URL
    git add -A && git commit -m "Commit inicjalny"
    git push -f openshift master
    rhc app restart -a DEPLOYED_APP_NAME
    ```
4. Dopracować komunikaty o błędach - patrz handleErrors

[git]:http://git-scm.com/
[node.js]:http://nodejs.org
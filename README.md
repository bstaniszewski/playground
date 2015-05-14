# Playground

Aplikacja na MEAN stack przygotowana do uruchomienia produkcyjnego na platformie Openshift

### Wersja
0.4.0

### Co nowego?
-  pojawił się klient, na razie w postaci odłączonej od wszystkiego prostej strony html dostępnej pod adresem http://localhost:9000

### Wymaga

* [Node.js] - w wersji >=0.12.2
* [Git]
* [mongoDB] 

### Aktualizacja stosu dla bieżącej wersji

1. Zaktualizuj aplikację:
    * odpal konsolę
    * przejdź do folderu z projektem
    ```sh
    $ git pull origin master
    $ npm install
    $ npm start
    ```

### Narzędzia:

1. Testowane API za pomocą przeglądarki - [Postman 2.0] - Plugin dla Google Chrome (oczywiście można użyć zamiast niego CURL'a)
2. Klient MongoDB - Umongo - Na początek wystarczy ... nie miałem czasu znaleźć lepszego narzędzia.

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

4. Do wystawienia API:
    1. Jak organizować routing:
        * Dokumentacja express http://expressjs.com/4x/api.html#router
        * Mastering Web Application Development with Express - 2014 Packt Publishing, Rozdział 3. - https://github.com/alessioalex/mastering_express_code/blob/master/chapter03/

5. Do odpalenia MongoDB i Mongoose:
    1. Web Development with Node and Express - 2014 Packt Publishing, Rozdział 13. - https://github.com/EthanRBrown/web-development-with-node-and-express
    
6. Do obsługi uwierzytelniania:
	A. Uwierzytelnianie użytkownika:
		1. Przebieg
			1. Użytkownik za pomocą formularza wprowadza komplet danych uwierzytelniających: identyfikator i hasło;
			2. Aplikacja klienta wywołuje usługę uwierzytelniania przekazując do niej wprowadzone przez użytkownika dane uwierzytelnijące;
			3. Usługa weryfikuje dane i w przypadku:
				a) udanego uwierzytelnienia: 
					* pobiera profil użytkownika;
					* wydaje i podpisuje token (JWT) o określonym okresie ważności, zawierający profil użytkownika;
					* odsyła w odpowiedzi podpisany token;
				b) nieudanego uwierzytelnienia:
					* odsyła komunikat o błędzie uwierzytelniania;
			4. Aplikacja klienta odbiera odpowiedź i w przypadku:
				a) udanego uwierzytelniania:
					* zapamiętuje token, 
					* dekoduje token i pobiera profil użytkownika;
					* zapamiętuje profil użytkownika;
					* przekierowuje do zabezpieczonej części aplikacji;
				b) nieudanego uwierzytelniania:
					* przekierowuje do strony logowania;
					* wyświetla informację o błędzie uwierzytelniania;
        2. Realizacja 
            1. Po stronie serwera - usługa uwierzytelniania:
                a) Wykorzystuję:	
                    * PassportJS - middleware do uwierzytelniania  - http://passportjs.org/guide/username-password/ 
                    * Passport-local-mongoose - plugin dla Mongoose umożliwiający rozszerzenie dokumentu o aspekt obsługi uwierzytelniania, zawiera moduł ze strategią uwierzytelniania za pomocą nazwy użytkownika i hasła - https://github.com/saintedlama/passport-local-mongoose
                    * Jsonwebtoken - moduł do obsługi JWT - https://github.com/auth0/node-jsonwebtoken
                b) Do rozpoznania korzystałem ze:
                    * http://jwt.io/
                    * https://developer.atlassian.com/static/connect/docs/latest/concepts/understanding-jwt.html
                    * https://auth0.com/docs/jwt					
            2. Po stronie klienta - do uwierzytelnienia:
                a) Formularz logowania użytkownika - identyfikator i hasło wysyłane do usługi uwierzytelniania (http.post(...))
                b) Do rozpoznania korzystałem ze:
                    * https://thinkster.io/angularjs-jwt-auth/
                    * https://github.com/auth0/angularjs-jwt-authentication-tutorial
    B. Uwierzytelnianie wywołań API:
        1.Przebieg
            1. Aplikacja klienta wywołuje API
            2. Wywołanie przechodzi przez httpinterceptor, który dodaje nagłówek z tokenem uwierzyteniającym pozyskanym w A
            3. Żądanie trafia do serwera, przechodzi przez middleware uwierzytelniania i w przypadku:
                a) udanego uwierzytelnienia jest przepuszczane dalej;
				b) nieudanego uwierzytelnienia - odrzucane z komunikatem o błędzie uwierzytelnienia.
        2. Realizacja 
            1. Po stronie serwera - usługa uwierzytelniania:
                a) Wykorzystuję:	
                    * PassportJS - middleware do uwierzytelniania  - http://passportjs.org/guide/username-password/ 
                    * Passport-http-bearer - plugin obsługujący uwierzytelnianie za pomocą tokena - https://github.com/jaredhanson/passport-http-bearer
                    * Jsonwebtoken - moduł do obsługi JWT - https://github.com/auth0/node-jsonwebtoken
                b) Do rozpoznania korzystałem ze:
                    * http://jwt.io/
                    * https://developer.atlassian.com/static/connect/docs/latest/concepts/understanding-jwt.html
                    * https://auth0.com/docs/jwt					
            2. Po stronie klienta - do uwierzytelnienia:
                a) httpinterceptor dołączający nagłówek z tokenem, zwrócony przez usługę uwierzytelniania.
                b) zdarzenia zmiany stanu ui-routera i parametry przypisane do stanów (zabezpieczony/otwarty).
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
5. Wpuścić obsługę błędów w API do rurociągu obsługi błędów
6. Uzupełnić/zaimplementowac dodatkowe metody API Dokument

[git]:http://git-scm.com/
[node.js]:http://nodejs.org
[mongoDB]:https://www.mongodb.org/
[Postman 2.0]:https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop
[Umongo]:http://edgytech.com/umongo/
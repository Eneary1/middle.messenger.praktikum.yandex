В проекте использоуются такие технологии как: express, TypeScript, Syntactically Awesome Stylesheets (SCSS), StyleLint, EsLint, Parcel.   
Проект собран при помощи сборщика parcel, который обработал все scss и ts файлы, преобразовав в css и js файлы соответственно.
Это приложение работает на одном html файле, роутинг по которому был сделан при при помощи изменения хэшей (якорей).
Для того, чтобы стили потенциально не смешивались и не мешали друг другу, было принято решение сделать все классы и id, пренадлежащие определённой странице, модульными, что позволит сделать каждый класс и id неповторимым.
Присутствует реализация block'а, eventBus'а, свой fetch.

Скачать проект себе можно, скопировав репозиторий, скачав zip файл

Существуют 2 основных способа заупстить проект: 
1) команда npm run build, после чего npm start: Будет запущен сервер, работающий на express
2) команда npm run dev: Проект будет собран и запущен parcel'ем

Проект, вне зависимости от выбранного метода запуска, будет работать на сервере с портом 3000

Существуют также дополнительные команды, призванные облегчить разработку: 
npm run dev:nodemon: запуск сервера на express при содействии nodemon, с его помощью можно отслеживать изменения в проекте во время работы сервера
npm run eslint: команда, запускающая процесс линтинга ts файлов
npm run stylelint: команда, запускающая процесс линтинга scss файлов

### Ссылка на netlify: https://creative-syrniki-cbd444.netlify.app

### Ссылка на figma: https://www.figma.com/community/file/1160917686270641517
---

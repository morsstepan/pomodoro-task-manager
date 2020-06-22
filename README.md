# Pomodoro Task Manager

Пуханов Вячеслав, Масин Антон, Цаков Егор, Сычиков Илья, Морозов Степан

Менеджер позволяет пользователям отслеживать текущие задачи и работать с ними по методике Pomodoro: устанавливать периоды работы и отдыха для повышения продуктивности.

Задачи можно создавать/выполнять/удалять, задавать им сроки, назначать другому пользователю или нескольким пользователям.

Flask 😍 + React 🥰

![](https://i.imgur.com/NKSdmLn.png)

## Запуск приложения

Для запуска приложения используется Python 3.8.3 и Pipenv. Перед запуском нужно установить зависимости и поднять Docker-сервисы:

    pipenv install
    docker-compose up
    pipenv run python -m flask run --port 4433
    cd app/http/web && npm start
    
Сервер запускается на порте :4433, клиент на :8080, mongodb на :27017

## Функциональность

Сейчас позволяет авторизоваться, создавать проекты с указанием даты их планируемого завершения и удалять их. Еще нужно:

 ~~- [ ] Редактировать название и дату завершения проектов~~
 
 ~~- [ ] Добавление туду в проект и работа с ними~~
 - [ ] Развернуть это все где-нибудь

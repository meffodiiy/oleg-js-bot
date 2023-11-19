# Telegram Bot
1. Создать бота с помощью [@BotFather](https://t.me/BotFather) и скопировать полученный токен для [Telegram Bot API](https://core.telegram.org/bots/api)
2. Копировать Github репозитрий полученный от [@meffodiiy](https://t.me/meffodiiy):
```shell
git clone https://github.com/meffodiiy/oleg-js-bot.git
```
3. Создать ветку `telegram-bot-module` и переключиться на нее
```shell
git checkout -b telegram-bot-module
```
4. Создать файл [.env](.env) для хранения переменных среды 
5. Сохранить скопированный токен в файл [.env](.env) под ключем `TELEGRAM_BOT_API_TOKEN`
```dotenv
TELEGRAM_BOT_API_TOKEN=123456:telegrambottoken
```
6. Внести в файл [.gitignore](.gitignore) запись `.env` 
7. Инициировать базовую `npm` конфигурацию ([package.json](package.json)), установить тип проекта `"module"`
```shell
npm init -y
```
9. Создать тестовый модуль [bot.test.js](bot.test.js) 
9. Внести в файл [.gitignore](.gitignore) запись `*.test.js` 
10. Создать script-конфигурацию для запуска тестового модуля [bot.test.js](bot.test.js) с подключение переменных среды из файла [.env](.env): 
```shell
node --env-file=.env bot.test.js
``` 
11. commit + push 
12. Создать модуль [telegrambot.js](telegrambot.js) 
13. Релизовать класс `TelegramBot` 
14. Конструктор класса принимает строковое значение `token` - токен для Telegram Bot API 
15. Класс должен иметь три публичных метода: `performMethod`, `onUpdate`, `startLongpollingSession` 
16. `performMethod` выполянет указаный API метод, принимает два аргумента: `methodName` и `payload`, где `methodName` - имя API метода, который нужно выполнить, с помощью POST операции; `payload` - необязательный объект, содержащий ключи и значение, которые ожидает исполняемый метод в качестве тела POST запроса. 
17. commit + push 
18. `onUpdate` регистрирует callback, который срабатывает при получении нового обновления от Telegram, принимает callback c одним аргументом `update` - объект описывающий обновление от Telegram. 
19. commit + push 
20. `startLongpollingSession` запускает longpolling сессию, которая переодически запрашивает обновления у Telegram, посредством API метода `getUpdates`, принимает один аргумент `delay` - число миллисекунд задержки между запросами longpolling cессии, со значением по умолчанию `500`. Данный метод должен переиспользовать `performMethod`. Каждый запрос должен сопровождаться значение `offset`, которое равно сумме `update_id` последнего обновления и `1`. Стартовое значение `offset` равно `0`. Полученные обновления должны по одному быть отправлены в callback метода `onUpdate`. 
21. commit + push 
22. Создать Pull-Request на слияние ветки `telegram-bot-module` и главной ветки

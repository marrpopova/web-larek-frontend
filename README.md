# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Компоненты модели данных (бизнес-логика)
1. ``` APIClient ```
Описание: отвечает за взаимодействие с сервером. Выполняет запросы к API для получения/отправки данных.
  - Выполнение запросов к API.
  - Получение данных о товарах.  
Методы:  

  ```getProducts()``` — возвращает список товаров.  

  ```submitOrder(orderData)``` — отправляет заказ на сервер.  
  
  ```getProductById(id)``` — возвращает данные по конкретному товару.  
  


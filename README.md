# Проектная работа "Веб-ларек"  

### Архитектура проекта  

Архитектура проекта построена на принципах изолированности, единственной ответственности и масштабируемости. В основе лежит паттерн MVP (Model-View-Presenter) для обеспечения модульности и удобства.  

## Основные части архитектуры:
### Данные (Model):
Описывают бизнес-логику и хранят информацию о товарах, корзине и заказах.
Включают трансформацию данных, получаемых от API, в удобный для представления формат.
### Представление (View):
Отвечают за отображение данных пользователю.
Реализуют модальные окна, страницы и компоненты интерфейса, такие как каталог, корзина, форма оформления заказа.
### Презентер (Presenter):
Контролируют взаимодействие между данными и представлениями.
Реализуют обработку событий и управление состоянием приложения через EventEmitter.  

## Компоненты приложения  
  1. Карточка товара (содержит данные названия товара, описания, цены, категории, изображения).
  2. Форма для заказа (содержит данные способа оплаты, адреса доставки, почты, телефона).
  3. Каталог товаров (отображает каталог).
  4. Корзина с товарами (отображает список выбранных товаров с возможностью редактирования: удаление/добавление в корзину, очищение корзины)
## Данные в приложении  
  - Название товара
  - Описание товара
  - Цена товара
  - Категория товара
  - Изображение товара
  - Способ оплаты
  - Адрес доставки
  - Почта
  - Телефон
## Действия в приложении 
  - Выбор способа оплаты и адреса
  - Указание почты и телефона
  - Очистка данных

  - Добваление в корзину
  - Удаление из корзины
  - Очищение корзины
  - Получение списка товаров в корзине
    
### Стек: HTML, SCSS, TS, Webpack

### Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

### Важные файлы:
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
## Данные (Model)  
### Класс Product
Содержит данные карточек товара.  

Поля:  
  name: string // Название товара  
  description: string // Описание товара



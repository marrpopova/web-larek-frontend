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
### 1. ```APIClient```
Описание: 
  - Выполняет запросы к API.
  - Получает данные о товарах.
    
  Методы:  

  ```getProducts()``` — возвращает список товаров.  

  ```submitOrder(orderData)``` — отправляет заказ на сервер.  
  
  ```getProductById(id)``` — возвращает данные по конкретному товару.  
### 2. ```Cart```
Описание:  
  - Добавление, удаление и подсчёт товаров.
    
Методы:

```addItem(product)``` — добавляет товар в корзину.  

```removeItem(productId)``` — удаляет товар.  

```getItems()``` — возвращает список товаров в корзине.  

```getTotal()``` — возвращает сумму заказа.
### 3. ```Order```  

Описание:
  - Хранит данные о текущем заказе.  
  
Методы:  

```setDeliveryInfo(address, paymentMethod)``` — устанавливает способ доставки.  

```setContactInfo(email, phone)``` — сохраняет контактные данные.  

```validate()``` — проверяет, заполнены ли все данные для заказа.  

## Компоненты представления  
### 1. ```ProductList```  
Описание:  
  - Отображает список товаров в магазине.
    
Методы:  

```render(products)``` — отрисовывает список товаров.  

```setProductClickHandler(handler)``` — задаёт обработчик нажатия на карточку товара.
### 2. ```Modal```  
Описание  
  - Отображает детали товара и корзину в модальном окне.
    
Методы:  

```show()``` — отображает модальное окно.  

```hide()``` — закрывает окно.  

```setBuyClickHandler(handler)``` — обрабатывает добавление товара в корзину.

### 3. ```CartView```  
Описание  
  - Отображает содержимое корзины.
    
Методы:  

```render(cartItems) ``` — показывает товары в корзине.  

```setRemoveItemHandler(handler)``` — задаёт обработчик для удаления товаров.

### 4. ```OrderFormView```  
Описание  
  - Работает с формой отправления заказа.
    
Методы:  

``` renderStep(step) ``` — показывает текущий шаг оформления.  

```setFormSubmitHandler(handler)``` — обрабатывает отправку формы.

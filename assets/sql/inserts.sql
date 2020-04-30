INSERT INTO shop.orders (order_id, order_date, client_id, delivery_place) VALUES (1, '2020-04-30', 1, 'Chernihiv');
INSERT INTO shop.orders (order_id, order_date, client_id, delivery_place) VALUES (2, '2020-04-29', 1, 'Chernihiv');
INSERT INTO shop.orders (order_id, order_date, client_id, delivery_place) VALUES (3, '2020-04-25', 2, 'Kyiv');
INSERT INTO shop.orders (order_id, order_date, client_id, delivery_place) VALUES (4, '2020-04-25', 3, 'Sevastopol');
INSERT INTO shop.orders (order_id, order_date, client_id, delivery_place) VALUES (5, '2020-04-27', 4, 'Symu');

INSERT INTO shop.product_orders (product_id, order_id, count) VALUES (1, 2, 3);
INSERT INTO shop.product_orders (product_id, order_id, count) VALUES (1, 4, 1);
INSERT INTO shop.product_orders (product_id, order_id, count) VALUES (2, 5, 1);
INSERT INTO shop.product_orders (product_id, order_id, count) VALUES (5, 1, 2);
INSERT INTO shop.product_orders (product_id, order_id, count) VALUES (4, 3, 1);
INSERT INTO shop.product_orders (product_id, order_id, count) VALUES (5, 2, 1);

INSERT INTO shop.products (product_id, name, description, price, discount, image_source, country) VALUES (1, 'Кумкват', 'some interesting info', 10, 0, '1.svg', 'Мексика');
INSERT INTO shop.products (product_id, name, description, price, discount, image_source, country) VALUES (2, 'Апельсин', 'some interesting info', 40, 5, '2.svg', 'Армения');
INSERT INTO shop.products (product_id, name, description, price, discount, image_source, country) VALUES (3, 'Мандарин', 'some interesting info', 100, 0, '3.svg', 'Израиль');
INSERT INTO shop.products (product_id, name, description, price, discount, image_source, country) VALUES (4, 'Авокадо', 'some interesting info', 50, 10, '4.svg', 'Америка');
INSERT INTO shop.products (product_id, name, description, price, discount, image_source, country) VALUES (5, 'Яблоко', 'some interesting info', 5, 50, '5.svg', 'Украина');

INSERT INTO clients.clients (id, email, registration_date, phone_number, shop_id) VALUES (1, 'test1@gmail.com', '2020-04-30', '+380999999999', 1);
INSERT INTO clients.clients (id, email, registration_date, phone_number, shop_id) VALUES (2, 'test2@gmail.com', '2020-04-16', '+380888888888', 1);
INSERT INTO clients.clients (id, email, registration_date, phone_number, shop_id) VALUES (3, 'test3@gmail.com', '2020-04-09', '+380777777777', 1);
INSERT INTO clients.clients (id, email, registration_date, phone_number, shop_id) VALUES (4, 'test4@gmail.com', '2020-04-15', '+380666666666', 1);

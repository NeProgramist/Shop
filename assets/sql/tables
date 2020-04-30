create table if not exists clients
(
    id                int auto_increment
        primary key,
    email             varchar(60)   not null,
    registration_date date          not null,
    phone_number      char(13)      not null,
    shop_id           int default 1 not null
);

create table if not exists shop.orders
(
    order_id       int auto_increment
        primary key,
    order_date     date        not null,
    client_id      int         null,
    delivery_place varchar(80) not null,
    constraint orders_clients_id_fk
        foreign key (client_id) references clients (id)
            on update cascade on delete cascade
);

create table if not exists shop.products
(
    product_id   int auto_increment
        primary key,
    name         varchar(60)   not null,
    description  varchar(600)  null,
    price        int           not null,
    discount     int default 0 not null,
    image_source varchar(100)  not null,
    country      varchar(60)   null,
    constraint products_name_uindex
        unique (name)
);

create table if not exists shop.product_orders
(
    product_id int           null,
    order_id   int           not null,
    count      int default 1 not null,
    constraint product_orders_pk
        unique (order_id, product_id),
    constraint product_orders_orders_order_id_fk
        foreign key (order_id) references shop.orders (order_id),
    constraint product_orders_products_product_id_fk
        foreign key (product_id) references shop.products (product_id)
            on update cascade on delete cascade
);

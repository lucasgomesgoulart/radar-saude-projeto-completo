Lucas Gomes Goulart

Projeto para estágio Radar Saúde.

Para o banco POSTGRES, utilizei a ferramenta ElephantSQL, e o script de  para criação de banco foi:

*CREATE TABLE IF NOT EXISTS USERS (
user_id serial primary key,
name varchar(255) not null,
sex char(1) not null,
dateBirthday date not null,
phone varchar(16) not null,
email varchar(50)
);

Utilizei o método de paginação do próprio ANTD, tive dificuldades em fazer pelo próprio frontend.

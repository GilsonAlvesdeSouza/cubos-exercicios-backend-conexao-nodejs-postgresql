create database bibliteca;

create table autores(
	id serial primary key,
	nome varchar(100) not null,
	idade int
);

create table livros(
	id serial primary key,
	nome varchar(100) not null,
	genero varchar(50),
	editora varchar(50),
	data_publicacao date,
	id_autor int not null
);

alter table livros add constraint FK_LIVROS_AUTOR
foreign key(id_autor) references autores(id);

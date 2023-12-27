PGDMP                         {         	   project_1    15.1    15.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    320658 	   project_1    DATABASE     �   CREATE DATABASE project_1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Kazakh_Kazakhstan.utf8';
    DROP DATABASE project_1;
                postgres    false                       0    0    DATABASE project_1    COMMENT     .   COMMENT ON DATABASE project_1 IS 'project_1';
                   postgres    false    3339            �            1259    320694    здание    TABLE     �   CREATE TABLE public."здание" (
    "здание" character varying(30),
    "подъезд" integer,
    "квартира" integer
);
 "   DROP TABLE public."здание";
       public         heap    postgres    false            �            1259    320700    квартира    TABLE     7  CREATE TABLE public."квартира" (
    "номер" integer NOT NULL,
    "здание" character varying(30),
    "подъезд" integer,
    "этаж" integer,
    "квадратура" double precision,
    "комнаты" integer,
    "стоимость" integer,
    "статус" boolean
);
 &   DROP TABLE public."квартира";
       public         heap    postgres    false            �            1259    320715    подезд    TABLE     w   CREATE TABLE public."подезд" (
    "подъезд" integer,
    "квартира" public."квартира"
);
 "   DROP TABLE public."подезд";
       public         heap    postgres    false    216            �            1259    320697    подъезд    TABLE     �   CREATE TABLE public."подъезд" (
    "подъезд" integer,
    "квартира" integer,
    "здание" character varying(30)
);
 $   DROP TABLE public."подъезд";
       public         heap    postgres    false                      0    320694    здание 
   TABLE DATA           ^   COPY public."здание" ("здание", "подъезд", "квартира") FROM stdin;
    public          postgres    false    214   |                 0    320700    квартира 
   TABLE DATA           �   COPY public."квартира" ("номер", "здание", "подъезд", "этаж", "квадратура", "комнаты", "стоимость", "статус") FROM stdin;
    public          postgres    false    216   �                 0    320715    подезд 
   TABLE DATA           N   COPY public."подезд" ("подъезд", "квартира") FROM stdin;
    public          postgres    false    217   �                 0    320697    подъезд 
   TABLE DATA           `   COPY public."подъезд" ("подъезд", "квартира", "здание") FROM stdin;
    public          postgres    false    215   �       q           2606    320704 &   квартира квартира_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public."квартира"
    ADD CONSTRAINT "квартира_pkey" PRIMARY KEY ("номер");
 T   ALTER TABLE ONLY public."квартира" DROP CONSTRAINT "квартира_pkey";
       public            postgres    false    216            s           2606    320705 "   подъезд fk_квартира    FK CONSTRAINT     �   ALTER TABLE ONLY public."подъезд"
    ADD CONSTRAINT "fk_квартира" FOREIGN KEY ("квартира") REFERENCES public."квартира"("номер");
 P   ALTER TABLE ONLY public."подъезд" DROP CONSTRAINT "fk_квартира";
       public          postgres    false    215    216    3185            r           2606    320710     здание fk_квартира    FK CONSTRAINT     �   ALTER TABLE ONLY public."здание"
    ADD CONSTRAINT "fk_квартира" FOREIGN KEY ("квартира") REFERENCES public."квартира"("номер");
 N   ALTER TABLE ONLY public."здание" DROP CONSTRAINT "fk_квартира";
       public          postgres    false    216    3185    214               G   x�s*��I��KWp�4�44�r��8�8�|gNcNCc��M�)�z34��h�-��[��72������ ��+K         �   x���1�0E�Sp�(v��)�`DB���jTy"K?�=��w{=���rCE�"vQ+v�I���
���,`M���j��^�Z��(`�d����o[�	�h0�XA'0��chN�Y��a�d�L=�%:�8WϬ��K��o����):lI�3���	�G�sJ��U�            x������ � �         F   x�3�44�t*��I��KWp�2�44B𝸌9�|g.CNC4��h���ԛ���@So���� Y}� %�+K     
PGDMP                          |         	   project_1    15.1    15.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    320658 	   project_1    DATABASE     �   CREATE DATABASE project_1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Kazakh_Kazakhstan.utf8';
    DROP DATABASE project_1;
                postgres    false            �           0    0    DATABASE project_1    COMMENT     .   COMMENT ON DATABASE project_1 IS 'project_1';
                   postgres    false    3320            �            1259    328851    квартира    TABLE     ]  CREATE TABLE public."квартира" (
    "номер" integer,
    "здание" character varying(30),
    "подъезд" integer,
    "этаж" integer,
    "квадратура" double precision,
    "комнаты" integer,
    "стоимость" integer,
    "статус" character varying(30),
    image character varying(30)
);
 &   DROP TABLE public."квартира";
       public         heap    postgres    false            �          0    328851    квартира 
   TABLE DATA           �   COPY public."квартира" ("номер", "здание", "подъезд", "этаж", "квадратура", "комнаты", "стоимость", "статус", image) FROM stdin;
    public          postgres    false    214   f       �   #  x���=��:��x�Ō�n}���]�]� ���5;Bm=�4�<nnB�+�?�=n�8~|���q���S>�#����o_���_��������q��/�]���������-%~6�??J��:��2{�?3������3Q2߲8��ܲn�ҐJ�z˶��۔�ݲoI��\��186ô�cgGQ�]�u�YR��r�:�l)&�>Ϛbޖ\�agO�	J���gQ�nK.ﰳ��<۝U�+	�>s뫗̮$�[�a��$�}�ٕ���;�����n7]2���-���ή�x�[=vv%��gn}��]I?,���ή48�YgW�%�w�ٕ>]ev��R�˧ے�;��J�g��+�;��r�3�����+����w�ٕ6�>Ϯ�oK�ﰳ��tU��+ͮRܖ\�agWI<۝]%�X|�J�>s�;��*��r�;��*�>ϮRݖ\�agW�骲ۭW�]��-���ήrpl7Ϯr���U�c���vv�����;��ɳ�����%�w��U~�j�vەgW�nK�ﰳ��<۝]���}�ַ]evU�a��vvUı�evUt[r}��]����n�_evU����������T��]�v�3���ήJ?,���ήjp�s�]ո-���ή�,��;\u�U���Dc��VM�mϺj���W-瞓Ӎ�1k��&'C��j������C����gg�	;��4���x���9;;k���ܬ?�mgeM˜����Z�v|���>�FZ�6�[�}������?.�m����~��cu�yB�c�_b�"�`bc��T���v6�e[��agS]�ﰳ��<�*oK�8�챗m�2��=��^Φzے,yXLG�ə�\z�5�Q���Ä4�CsY�ƌ4ȱ�\X�1%�8졠�KcR��d^�1+ek*����갘���-�iLKÓ9��+��bؚ�l�g�uf�E9����4:��9�5��ɥ�Y�[���Fg�lM�b����,�m��L���tF����C�3	[����|�xh�3�랏{�uf��z���(ɥљ���L�3)[S��EgR�Iۖ��4:��3rT'W�iؚ�lhL��Cs��Fg*Ǟs��^w�sܘ�GM.��4oMvf�iٚj�,:���L۶dg�љ>��#C����,���Ά��>�xh�3��,ɱ�\g��YR�q�u;�4:Kyk�3��,���V̢�T���-ٙit����ѥ\mht���dgCc�s<4יit���s�3��,��1Ϗ9��zb"oMvf��5ՊYt��â�ܶ%;3����9B�C���&;��X⡹�L��"Ǟs��FgE=Ǎ�~,ɥ�Y�[���^�攭�V̢�R���-ٙitV����ړ[ã���`�Ǵ?�xzrk�U9���ŚGoU}Ǐ�����\͇gg��Q]-��&���3aե��κ"Q��m�qɺ*���:;Y����u�@�1����;����;��q�>0=>��~jT�n �߇
��캅�����k��3f�Z����g����Xm�0]���K��[ٚ<��[�[�g��:�5y�M���]ǍV��*9G��!J�ڣK��.[���4Z��5y�M�ӵ���sn���:n�֟�ș��|�(b�.��zۚ<���}k�^�܆��s�.��
	�q܂{�����^yh<yԥ����97��oCޚ<��m([���4��u�x�6<���&�ʡ�K���&���q=��&Ϲi�ek�FkQ=Ǎ�����a׆���K��X�&Ϲ�]�&Ϲi����97��bw7Z��5��P�u��_Ht��{ٚ<�њ���97��省�sn�Iv7Z�g��_:�5پkbť���lk����W��qA4��we�C�5QH�'s�O�~�Q��<�O;?5�R�L��񗺦
/5�mM^j�ښ)����ϗķ�DA�D�Ɗ�yBb?ד}�c� k�`�\1��K]�����_j�.�~�S\��z7w�M���\�է5�F���h����S iѳmL��K���.��Z:��;��Z�.������x��q/�nM��������6Zkݥ�Z��x��8nFk]\���5�[@�o�����&W�4Z�ٵm�֋K��^]��v7w�M��7v�^�p|Zc���cd��:^C<<�h��/�8��_;uz��1$�ǯC>��;���/Cqz��q]�g���l?$�D@�5}fg�S���:��k�w:�_�F�Fu���Fs���Fq���Fo���Fm�����_L���S9����*��5���NM���]�Fi�i��+z�������(MԥQ�$�Fi�]�Iqi�&GkT�fQ�<����l�|LT��d��Q�϶�4~��93��T\z�5@]�iri��٥Q��FiZ]���թY��Oi��l/�������d�C�IDMѳm<��I�i朙FiI]z��"�4JK٥QZ*.��Rui���K��t�Fuj��4rF��{���&;5�Ҳ���Ҳ~��93��rr��6���(-�Fi��4J�ͥQZ�.����թ����4r2��24J+�5٩i�VԵm�V�7͜3�(�d�^o�).��Jui�V�K���]���Ѹw��h���,J�Oi�<6_uh�Vuk�S�(�&׶���4s�L��Z\z�婺4J�ͥQZ�.��Z�h�9�]���5�S�(�=��S�|���JK[����gZˮm��V�i朙Fi���z�Xsi�ֺK��<��G�Fi]\���5�S�(�?����|��QZ�[���Fi�����z���sf������uݥ���C'�3H!�4�aĥ���.��؅�5�S�x�]ؓ[�NC�I����Q�y���S�n�x��q� Уg�x��q���Gs���W>��&F�Gw�=�w�w�y��~��i�s�ux��Y�>���He#�     
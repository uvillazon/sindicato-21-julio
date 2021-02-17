DROP PROCEDURE SINDICATO_121_2020.P_AUX_CONSTRUCTOR_SP_GRABAR;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_AUX_CONSTRUCTOR_SP_GRABAR(p_tabla varchar2, p_parte number) 
 /*
 Finalidad: Construccion de un SP base, para a partir de ella se termine la definicion de un SP de ALTA  o MODIFICACION (GRABAR)
 Recibe:  p_tabla  -> Tabla para la que se construira el SP de
 Fecha Creacion: 26/07/2013
 Autor: Henry Terceros 
 */
IS
 v_cnt NUMBER:=0;
 v_i NUMBER:=0;
 v_CampoID VARCHAR2(30); -- Nombre del campo ID de una tabla
 v_cad VARCHAR2(255);
 v_cNul VARCHAR2(3000):='';
 v_cIns VARCHAR2(3000):='';
 v_cVal VARCHAR2(3000):='';
 v_sep VARCHAR2(2):='';
 v_fin VARCHAR2(2):='';
BEGIN
IF p_parte = 0 OR p_parte = 1 THEN
    --select count(1) into v_cnt from user_tables;
  v_cad := 'CREATE OR REPLACE PROCEDURE P_' || SUBSTR(p_tabla,1,2) || '_GRABAR_' || SUBSTR(p_tabla,4,LENGTH(p_tabla)) || '(' ;
  dbms_output.put_line(v_cad);
  -- Parametros de entrada
  FOR x IN (SELECT * FROM  user_tab_columns WHERE table_name = p_tabla ORDER BY column_id)
  LOOP
    v_cad := ' p_' || lower(x.column_name) || '  IN ' || p_tabla || '.' || x.column_name || '%TYPE,';
    dbms_output.put_line(v_cad);
    -- Construimos la validacion de nulos
    IF x.nullable = 'N' THEN
        v_cNul := v_cNul || 'p_' || lower(x.column_name) || ' IS NULL OR ';
    END IF;
    -- Construimos la cadena INSERT ... El VALUE sera generado mas abajo
    v_cIns := v_cIns || lower(x.column_name) || ', ';
  END LOOP;
  dbms_output.put_line(' p_login_usr   VARCHAR2,  -- Login del usuario que realiza la operacion');
  dbms_output.put_line(' p_res OUT  VARCHAR2');
  dbms_output.put_line(')');
  v_cNul := substr(v_cNul,1,length(v_cNul)-3);
  v_cIns := substr(v_cIns,1,length(v_cIns)-2);
  v_cVal := substr(v_cVal,1,length(v_cVal)-2);
   -- Segmento de Descripcion general del SP
   dbms_output.put_line('/*');
  dbms_output.put_line(' Finalidad: Procedimiento para grabar el alta o modificacion de ' || SUBSTR(p_tabla,4,LENGTH(p_tabla)));
  dbms_output.put_line(' Recibe:  __ , __ , etc -> Parametros ');
  FOR x IN (SELECT * FROM  user_tab_columns WHERE table_name = p_tabla ORDER BY column_id)
  LOOP
    v_cad := '         p_' || lower(x.column_name) || '  -> ';
    dbms_output.put_line(v_cad);
  END LOOP;
  dbms_output.put_line(' Retorna: p_res ->Mensaje de OK ("1") o Descripcion del error');
  dbms_output.put_line(' Fecha Creacion: ' || trunc(sysdate) );
  dbms_output.put_line(' Autor: [nombre] [apellido]'); 
  dbms_output.put_line(' Rev:');
  dbms_output.put_line(' */');
  dbms_output.put_line('IS');
  -- Variables locales
  dbms_output.put_line(' v_cnt NUMBER:=0;');
  dbms_output.put_line(' v_res VARCHAR2(100):=''0''; ');
  dbms_output.put_line(' v_sql VARCHAR2(2000);'); 
  dbms_output.put_line(' v_sql1 VARCHAR2(200);'); 
  dbms_output.put_line(' v_tipo_oper VARCHAR2(10);');
  dbms_output.put_line(' v_rg    ' || p_tabla || '%ROWTYPE;');
  dbms_output.put_line(' v_errC   MN_AUX_LOG_ERRORES.cod_error%type;');
  dbms_output.put_line(' v_errD   MN_AUX_LOG_ERRORES.desc_error%type;');
  dbms_output.put_line(' v_id_log MN_AUX_LOG_ERRORES.id_log%type;');
  dbms_output.put_line(' v_id       NUMBER := 0;');
  dbms_output.put_line('BEGIN');
  -- Segmento de validacion de nulos
  dbms_output.put_line('  -- Validamos nulos');
  dbms_output.put_line('  IF ' || v_cNul || ' THEN');
  dbms_output.put_line('    v_res := ''Faltan parametros.'';');
  dbms_output.put_line('  END IF;');
  -- Segmento validacion de existencia de registro (ojo: para este control, el campo ID de la tabla debe ser el primero)
  SELECT lower(column_name) INTO v_CampoID FROM  user_tab_columns WHERE table_name = p_tabla AND column_id = 1;
  dbms_output.put_line('  -- Para el caso de ALTA, validamos que el registro NO exista');
  dbms_output.put_line('  IF v_res = ''0'' AND (p_' || v_CampoID || ' = 0 OR p_' || v_CampoID || ' IS NULL ) THEN');
  --dbms_output.put_line('      SELECT COUNT (1) INTO v_cnt FROM ' || p_tabla || ' WHERE XxxxX = p_XxxxX; -- !!!! Cambiar el campo XxxxX por el que corresponda validar duplicados !!!!');
  dbms_output.put_line('      IF F_MN_EXISTE_REG(''' || p_tabla || ''',''XxxxX='' || p_XxxxX)=TRUE THEN -- !!!! Cambiar el campo XxxxX por el que corresponda validar duplicados !!!!');
  --dbms_output.put_line('      IF v_cnt > 0 THEN');
  dbms_output.put_line('         v_res := ''El elemento '' || p_XxxxX || '' ya existe.'';');
  dbms_output.put_line('      END IF;');
  dbms_output.put_line('  END IF;');
  dbms_output.put_line('  -- Para el caso de MODIFICACION, validamos que el registro exista');
  dbms_output.put_line('  IF v_res = ''0'' AND p_' || v_CampoID || ' > 0 THEN');
  --dbms_output.put_line('      SELECT COUNT (1) INTO v_cnt FROM ' || p_tabla || ' WHERE ' || v_CampoID || ' = p_' || v_CampoID || ';');
  dbms_output.put_line('      IF F_MN_EXISTE_REG(''' || p_tabla || ''',''' || v_CampoID || '='' || p_' || v_CampoID || ')=FALSE THEN');
  dbms_output.put_line('         v_res := ''NO existe el elemento que pretende modificar.'';');
  dbms_output.put_line('      ELSE');
  dbms_output.put_line('         SELECT * INTO v_rg FROM ' || p_tabla || ' WHERE ' || v_CampoID || ' = p_' || v_CampoID || ';');
  dbms_output.put_line('      END IF;');
  dbms_output.put_line('  END IF;');
  
  dbms_output.put_line('  IF v_res=''0'' THEN');
  dbms_output.put_line('    -- Si se trata de una INSERCION ...');
  dbms_output.put_line('    IF p_' || v_CampoID || ' = 0 OR p_' || v_CampoID || ' IS NULL THEN');
  -- Segmento de INSERT
  dbms_output.put_line('        -- Obtenemos el correlativo');
  dbms_output.put_line('        SELECT q_' || p_tabla || '.nextval INTO v_id FROM dual;');
  dbms_output.put_line('        -- Creamos el registro');
  dbms_output.put_line('        v_sql:=''INSERT INTO ' || p_tabla || '(' || v_cIns || ') '' ||');
  dbms_output.put_line('               ''VALUES('' || v_id || '', '';');
  SELECT COUNT(1) INTO v_cnt FROM  user_tab_columns WHERE table_name = p_tabla;  -- Cantidad de columnas que tiene la tabla (Para definir el caracter final de la instruccion INSERT-coma o parentesis)
  v_i := 0;
  FOR x IN (SELECT * FROM  user_tab_columns WHERE table_name = p_tabla ORDER BY column_id)
  LOOP
    v_i := v_i + 1;
    IF v_i = v_cnt THEN
        v_fin := ')';
    ELSE
        v_fin := ', ';
    END IF;
    IF x.data_precision IS NULL THEN
        v_sep := '''''';
    ELSE
        v_sep := '';
    END IF;
    IF substr(x.column_name,1,2)='ID' AND x.column_id = 1 THEN
        v_cad:= ''; -- Indica que es el campo clave ... ya esta definido su valor lineas arriba
    ELSE
      IF x.column_name = 'FECHA_REG' THEN
        dbms_output.put_line('        v_sql:=v_sql || ''SYSDATE' || v_fin || ''';');
      ELSE
        IF x.nullable = 'N' THEN
          dbms_output.put_line('        v_sql:=v_sql || ''' || v_sep || ''' || ' || 'p_' || lower(x.column_name) || '|| ''' || v_sep || '' || v_fin || '''; ');
        ELSE
          IF x.data_precision IS NULL THEN
            dbms_output.put_line('        IF p_' || lower(x.column_name) || ' IS NULL THEN');
          ELSE
            dbms_output.put_line('        IF p_' || lower(x.column_name) || ' IS NULL OR p_' || lower(x.column_name) || '=0 THEN');
          END IF;
          dbms_output.put_line('          v_sql:=v_sql || ''NULL' || v_fin || ''';');
          dbms_output.put_line('        ELSE');
          dbms_output.put_line('          v_sql:=v_sql || ''' || v_sep || ''' || ' || 'p_' || lower(x.column_name) || '|| ''' || v_sep || '' || v_fin || '''; ');
          dbms_output.put_line('        END IF; ');
        END IF;
      END IF;
    END IF;
  END LOOP;
  dbms_output.put_line('        EXECUTE IMMEDIATE v_sql;');
  dbms_output.put_line('        -- Historico de estado');
  dbms_output.put_line('        v_sql:=''INSERT INTO MN_HIST_TRAN_ESTADOS(id_hist, id_tabla, tabla, operacion, est_orig, est_dest, observ, nom_autoriza, fecha_reg, login_usr) '' ||');
  dbms_output.put_line('               ''VALUES(q_mn_hist_tran_estados.nextval,'' || v_id || '',''''' || p_tabla || ''''',''''xxxOPERACIONxxx'''',''''xxxEST_ORIGxxx'''','''''' || p_estado|| '''''',''''xxxOBSERVACIONxxx'''',''''-'''', SYSDATE,'''''' || p_login_usr || '''''')''; -- !!!! Cambiar valores xxxAAAxxx por los que correspondan !!!!');
  dbms_output.put_line('        EXECUTE IMMEDIATE v_sql;');
  dbms_output.put_line('        v_tipo_oper := ''ALTA'';');
  dbms_output.put_line('    ELSE');

END IF;
IF p_parte = 0 OR p_parte = 2 THEN  

  -- Construimos el segmento para el UPDATE
  dbms_output.put_line('        v_id := p_' || v_CampoID || ';');
  dbms_output.put_line('        -- Construimos la consulta de actualizacion');
  dbms_output.put_line('        v_sql := '''';');
  FOR x IN (SELECT * FROM user_tab_columns WHERE table_name = p_tabla ORDER BY column_id)
  LOOP
    IF x.data_precision IS NULL THEN
        v_sep := '''''';
    ELSE
        v_sep := '';
    END IF;
    IF x.nullable = 'N' THEN
      v_cad := '        IF p_' || lower(x.column_name) || ' IS NOT NULL AND (p_' || lower(x.column_name) || ' <> v_rg.' || lower(x.column_name) || ' OR v_rg.' || lower(x.column_name) || ' IS NULL) THEN';
      dbms_output.put_line(v_cad);
        dbms_output.put_line('            v_sql := v_sql || '' ' || lower(x.column_name) || '=' || v_sep || ''' || p_' || lower(x.column_name) || ' || ''' || v_sep || ','';'); 
        dbms_output.put_line('        END IF;');
    ELSE
      IF x.data_precision IS NULL THEN
        dbms_output.put_line('        IF p_' || lower(x.column_name) || ' <> v_rg.' || lower(x.column_name) || ' OR (p_' || lower(x.column_name) || ' IS NULL AND v_rg.' || lower(x.column_name) || ' IS NOT NULL) OR (p_' || lower(x.column_name) || ' IS NOT NULL AND v_rg.' || lower(x.column_name) || ' IS NULL) THEN');
        dbms_output.put_line('            v_sql := v_sql || '' ' || lower(x.column_name) || '=' || v_sep || ''' || p_' || lower(x.column_name) || ' || ''' || v_sep || ','';'); 
        dbms_output.put_line('        END IF;');
      ELSE
        dbms_output.put_line('        IF p_' || lower(x.column_name) || ' <> v_rg.' || lower(x.column_name) || ' OR ((p_' || lower(x.column_name) || ' IS NULL OR p_' || lower(x.column_name) || ' = 0) AND v_rg.' || lower(x.column_name) || ' IS NOT NULL) OR (p_' || lower(x.column_name) || ' IS NOT NULL AND v_rg.' || lower(x.column_name) || ' IS NULL) THEN ');
        dbms_output.put_line('            IF p_' || lower(x.column_name) || ' IS NULL OR p_' || lower(x.column_name) || ' = 0 THEN');
        dbms_output.put_line('              v_sql := v_sql || '' ' || lower(x.column_name) || '=NULL,'';'); 
        dbms_output.put_line('            ELSE');
        dbms_output.put_line('              v_sql := v_sql || '' ' || lower(x.column_name) || '=' || v_sep || ''' || p_' || lower(x.column_name) || ' || ''' || v_sep || ','';'); 
        dbms_output.put_line('            END IF;');
        dbms_output.put_line('        END IF;');
      END IF;
    END IF;
--    dbms_output.put_line(v_cad);
--    dbms_output.put_line('            v_sql := v_sql || '' ' || lower(x.column_name) || '=' || v_sep || ''' || p_' || lower(x.column_name) || ' || ''' || v_sep || ','';'); 
            --v_sql := v_sql || ' cod_af=''' || p_cod_af || ' '' ,';
--    dbms_output.put_line('        END IF;');
  END LOOP;
  dbms_output.put_line('        -- Comprobamos si existe algun dato a modificar. ');
  dbms_output.put_line('        IF v_sql = '''' OR v_sql IS NULL THEN         -- Oracle trata actualemente a las cadenas vacias como NULL');
  dbms_output.put_line('            v_res := ''No existe ningun dato diferente a ser modificado.'';');
  dbms_output.put_line('        END IF;');
  dbms_output.put_line('        IF v_res = ''0'' THEN');
  dbms_output.put_line('            v_sql := ''UPDATE ' || p_tabla || ' SET '' || SUBSTR (v_sql, 1, LENGTH (v_sql) - 1) || '' WHERE ' || v_CampoID || ' = '' || p_' || v_CampoID || ';');
      --v_sql := 'UPDATE ttt SET ' || SUBSTR (v_sql, 1, LENGTH (v_sql) - 1) || ' WHERE id_rele = ' || p_id_rele;
  dbms_output.put_line('            EXECUTE IMMEDIATE (v_sql);');
  dbms_output.put_line('            v_tipo_oper := ''EDICION'';');
  dbms_output.put_line('        END IF;');
  dbms_output.put_line('    END IF;');

  --Segmento para grabar el historico de Alta o ??? Modificacion ???
  dbms_output.put_line('    IF v_res = ''0'' THEN');
  dbms_output.put_line('        -- Grabamos historicos (un registro por cada campo no nulo)');
  FOR x IN (SELECT * FROM user_tab_columns WHERE table_name = p_tabla ORDER BY column_id)
  LOOP
     IF (substr(x.column_name,1,2)='ID' AND x.column_id = 1) OR  x.column_name = 'FECHA_REG' OR  x.column_name = 'ID_USR'  THEN
        v_cad:= ''; -- No se crean historicos para estos campos
    ELSE
       dbms_output.put_line('        P_MN_GRABAR_HIST_EDICION_DATOS(v_id, ''' || p_tabla || ''', ''' || lower(x.column_name) || ''', v_rg.' || lower(x.column_name) || ', p_' || lower(x.column_name) || ', v_tipo_oper, p_login_usr, v_res);');
    END IF;
  END LOOP;
  dbms_output.put_line('        COMMIT;');
  dbms_output.put_line('        v_res := ''1'';');
  dbms_output.put_line('    END IF;');
  dbms_output.put_line('  END IF;');
  
  dbms_output.put_line('  p_res := v_res;');
  -- Bloque Excepcion
  dbms_output.put_line('EXCEPTION');
  dbms_output.put_line('  WHEN OTHERS THEN');
  dbms_output.put_line('    ROLLBACK;');
  dbms_output.put_line('    v_errC:=substr(sqlcode,1,20);');
  dbms_output.put_line('    v_errD:=substr(sqlerrm,1,200);');
  dbms_output.put_line('    p_mn_grabar_error_bd(v_errC, v_errD, ''ADM. ' || SUBSTR(p_tabla,4,LENGTH(p_tabla)) || ''', ''P_MN_GRABAR_' || SUBSTR(p_tabla,4,LENGTH(p_tabla)) || ''', v_sql, p_login_usr, v_id_log);');
  dbms_output.put_line('    p_res :=''ERROR. Avise a TI. LOG generado #'' || v_id_log;');

  dbms_output.put_line('END;');
END IF;
    
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_BACKUPTRAILER;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_BACKUPTRAILER(
 p_res OUT  VARCHAR2
)

IS
 v_cnt NUMBER:=0;
 contador NUMBER:=0;
 v_res VARCHAR2(100):='0'; 
v_sql VARCHAR2(1000):='';
 x NUMBER:=0;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
BEGIN
   
  IF v_res='0' THEN
      FOR x IN (SELECT  *   FROM all_tables WHERE OWNER = 'SINDICATO_121_2020' AND TABLE_NAME NOT IN   (select distinct table_name   from all_constraints WHERE OWNER = 'SINDICATO_121_2020' and constraint_type = 'R') ) LOOP
      v_sql := 'DELETE FROM SINDICATO_121_2020.'||x.TABLE_NAME||'';
      DBMS_OUTPUT.PUT_LINE(  v_sql );
     EXECUTE IMMEDIATE v_sql ;
     DBMS_OUTPUT.PUT_LINE(  v_sql );
      v_sql := 'INSERT INTO SINDICATO_121_2020.'||x.TABLE_NAME||' (SELECT * FROM  '||x.TABLE_NAME||'@DBSINDICATO_121_2020)';        
       --DBMS_OUTPUT.PUT_LINE(  v_sql );
      -- INSERT INTO AUX_SALIDAS_CONT  VALUES(Q_AUX_SALIDAS_CONT.nextval,x.ID_SALIDA  , x.FECHA ,v_res);
        EXECUTE IMMEDIATE v_sql ;
           
       END LOOP;
  
  
      FOR x IN (SELECT  *   FROM all_tables WHERE OWNER = 'SINDICATO_121_2020' AND TABLE_NAME  IN (select distinct table_name   from all_constraints WHERE OWNER = 'SINDICATO_121_2020' and constraint_type = 'R' )ORDER BY  TABLE_NAME ASC ) LOOP
      v_sql := 'DELETE FROM SINDICATO_121_2020.'||x.TABLE_NAME||'';
      DBMS_OUTPUT.PUT_LINE(  v_sql );
     EXECUTE IMMEDIATE v_sql ;
     DBMS_OUTPUT.PUT_LINE(  v_sql );
      v_sql := 'INSERT INTO SINDICATO_121_2020.'||x.TABLE_NAME||' (SELECT * FROM  '||x.TABLE_NAME||'@DBSINDICATO_121_2020 )';        
       --DBMS_OUTPUT.PUT_LINE(  v_sql );
      -- INSERT INTO AUX_SALIDAS_CONT  VALUES(Q_AUX_SALIDAS_CONT.nextval,x.ID_SALIDA  , x.FECHA ,v_res);
        EXECUTE IMMEDIATE v_sql ;
           
       END LOOP;
      COMMIT; 
        v_res := '1';
      
  END IF;
  p_res := v_res;

EXCEPTION
  WHEN OTHERS THEN
   -- ROLLBACK;
      v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);

END;
/


DROP PROCEDURE SINDICATO_121_2020.P_BACKUP_SERVER;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_BACKUP_SERVER(
 p_res OUT  VARCHAR2
)

IS
 v_cnt NUMBER:=0;
 contador NUMBER:=0;
 v_res VARCHAR2(100):='0'; 
v_sql VARCHAR2(1000):='';
 x NUMBER:=0;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
BEGIN
   
  IF v_res='0' THEN
  
     INSERT INTO SD_JOBS_BACKUP (ID_BACKUP , FECHA_REG) VALUES (Q_SD_JOBS_BACKUP.nextval , sysdate);
      
      FOR x IN (SELECT * FROM BACKUP_SINDICATO ORDER BY ORDEN DESC) LOOP
          v_sql := 'DELETE FROM '||x.TABLA||'@DBSINDICATO_BACKUP';
          EXECUTE IMMEDIATE v_sql ;
           --SELECT * FROM SD_AUTOS@DBSINDICATO_BACKUP
       END LOOP;
       
      FOR x IN (SELECT * FROM BACKUP_SINDICATO ORDER BY ORDEN ASC) LOOP
          v_sql := 'INSERT INTO  '||x.TABLA||'@DBSINDICATO_BACKUP (SELECT * FROM '||x.TABLA ||')';
          EXECUTE IMMEDIATE v_sql ;
           --SELECT * FROM SD_AUTOS@DBSINDICATO_BACKUP
 --          INSERT INTO SD_AUTOS@DBSINDICATO_BACKUP (select * FROM SD_AUTOS)
       END LOOP;
      
       
  
  
      COMMIT; 
        v_res := '1';
      
  END IF;
  p_res := v_res;

EXCEPTION
  WHEN OTHERS THEN
   -- ROLLBACK;
      v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);

END;
/


DROP PROCEDURE SINDICATO_121_2020.P_BACKUP_SERVERTOLOCAL;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_BACKUP_SERVERTOLOCAL(
 p_res OUT  VARCHAR2
)

IS
 v_cnt NUMBER:=0;
 contador NUMBER:=0;
 v_res VARCHAR2(100):='0'; 
v_sql VARCHAR2(1000):='';
 x NUMBER:=0;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
BEGIN
   
  IF v_res='0' THEN
  
     INSERT INTO SD_JOBS_BACKUP (ID_BACKUP , FECHA_REG) VALUES (Q_SD_JOBS_BACKUP.nextval , sysdate);
      
      FOR x IN (SELECT * FROM BACKUP_SINDICATO ORDER BY ORDEN DESC) LOOP
          --v_sql := 'DELETE FROM '||x.TABLA||'@DBSINDICATO_BACKUP';
          v_sql := 'DELETE FROM SINDICATO_121_2020_2020.'||x.TABLA;
          EXECUTE IMMEDIATE v_sql ;
           --SELECT * FROM SD_AUTOS@DBSINDICATO_BACKUP
       END LOOP;
       
      FOR x IN (SELECT * FROM BACKUP_SINDICATO ORDER BY ORDEN ASC) LOOP
          v_sql := 'INSERT INTO SINDICATO_121_2020_2020.'||x.TABLA||'  (SELECT * FROM '||x.TABLA ||')';
          EXECUTE IMMEDIATE v_sql ;
           --SELECT * FROM SD_AUTOS@DBSINDICATO_BACKUP
 --          INSERT INTO SD_AUTOS@DBSINDICATO_BACKUP (select * FROM SD_AUTOS)
       END LOOP;
      
       
  
  
      COMMIT; 
        v_res := '1';
      
  END IF;
  p_res := v_res;

EXCEPTION
  WHEN OTHERS THEN
   -- ROLLBACK;
      v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);

END;
/


DROP PROCEDURE SINDICATO_121_2020.P_GRABAR_ERROR_BD;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.p_grabar_error_bd( 
 p_errC      SINDICATO_121_2020.sd_aux_log_errores.cod_error%type,
 p_errD      SINDICATO_121_2020.sd_aux_log_errores.desc_error%type,
 p_modulo    SINDICATO_121_2020.sd_aux_log_errores.modulo%type,
 p_nombre_sp SINDICATO_121_2020.sd_aux_log_errores.nombre_sp%TYPE,
 p_cad_sql   SINDICATO_121_2020.sd_aux_log_errores.cad_sql%type,
 p_login_usr   VARCHAR2,   -- Login del usuario que realiza la operacion
 p_id_log OUT NUMBER  -- Mensaje de OK ("1") o Descripcion del error
)
/*
 Finalidad: Procedimiento que graba un error ocurrido al realizar una operacion en la BD (En el SisMan)
 Recibe: parametros del error y usr que estaba ejecutando el proceso
 Retorna: --
 Fecha Creacion: 26/07/2013
 Autor: Henry Terceros
 */
IS
  v_id_log  SINDICATO_121_2020.sd_aux_log_errores.id_log%type;

  PRAGMA AUTONOMOUS_TRANSACTION; -- Para que solo haga el COMMIT de las operaciones de este SP
BEGIN
  SELECT SINDICATO_121_2020.q_sd_aux_log_errores.nextval INTO v_id_log FROM dual;
  
  INSERT INTO SINDICATO_121_2020.sd_aux_log_errores(id_log, login_usr, fecha, modulo, nombre_sp, cod_error, desc_error, cad_sql) 
  VALUES(v_id_log, p_login_usr, SYSDATE, p_modulo, p_nombre_sp, p_errC, p_errD, substr(p_cad_sql,1,1000));
  COMMIT;
  
  p_id_log := v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_REC_PARAMETROS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_REC_PARAMETROS(
 p_cod_par VARCHAR2, -- Nombre de la secuencia (debe incluir el ESQUEMA)
 p_id_linea  NUMBER,
 p_res OUT VARCHAR2)
 IS
  v_errc sd_aux_log_errores.cod_error%type;
  v_errD sd_aux_log_errores.desc_error%type;
  v_id_log sd_aux_log_errores.id_log%type;
  v_cnt NUMBER:=0;
  v_res VARCHAR2(1000):='0';
  v_tipo VARCHAR2(1000):='';
 BEGIN
           select count(1) into v_cnt from SD_PARAMETROS_LINEA  
                    where CODIGO    = p_cod_par
                    AND ID_LINEA = p_id_linea
                    and ESTADO  = 'VIGENTE';
            IF v_cnt  > 0 THEN
                SELECT TIPO  INTO v_tipo
                 from SD_PARAMETROS_LINEA  
                 where CODIGO    = p_cod_par
                 AND ID_LINEA = p_id_linea
                 and ESTADO  = 'VIGENTE';
                 CASE 
                   WHEN v_tipo = 'MONTO' THEN 
                        SELECT MONTO   INTO v_res
                         from SD_PARAMETROS_LINEA  
                        where CODIGO    = p_cod_par
                        AND ID_LINEA = p_id_linea
                        and ESTADO  = 'VIGENTE';
                   WHEN v_tipo = 'CAJA' THEN
                        SELECT ID_CAJA    INTO v_res
                         from SD_PARAMETROS_LINEA  
                        where CODIGO    = p_cod_par
                        AND ID_LINEA = p_id_linea
                        and ESTADO  = 'VIGENTE';
                  ELSE 
                        v_res := 'Error No Existe el tipo: '||v_tipo;
                END CASE;
            p_res := v_res;
            ELSE
            
            p_res := 'Error No Existe ese parmetro';
            END IF;
 
   -- Obtenemos el siguiente valor de la secuencia (porque currval lo requiere)
   

 EXCEPTION 
   WHEN OTHERS THEN
      ROLLBACK;   
      v_errC:=substr(sqlcode,1,20);
      v_errD:=substr(sqlerrm,1,200);
      p_grabar_error_bd(v_errC,v_errD,'Procedimiento generico','P_REC_PARAMETROS','-'||p_cod_par,0,v_id_log);
      p_res := 'ERROR. LOG generado #' || v_id_log;
 END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_HOJA_USO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_HOJA_USO(
p_res OUT VARCHAR2
)
IS
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
BEGIN

IF v_res =  '0' THEN 

         FOR x IN (select * from SD_HOJAS_CONTROL  order by ID_HOJA ASC ) LOOP
            
            FOR y IN (WITH d AS
                (SELECT TRUNC ( x.FECHA_COMPRA , 'MM' ) - 1 AS dt
                FROM dual
                )
                SELECT dt + LEVEL as DIA
                FROM d 
                CONNECT BY LEVEL <= ADD_MONTHS (dt, 1) - dt ) LOOP
                INSERT INTO SD_DETALLES_HOJAS_USO  VALUES( Q_SD_DETALLES_HOJAS_USO.nextval , x.ID_HOJA  ,y.DIA , 'NUEVO',sysdate,null);
                              
                END LOOP;
                
         END LOOP;
        
     COMMIT;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_ACT_HOJA_USO','P_SD_ACT_HOJA_USO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_DEBE;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_DEBE(
p_id_socio SD_KARDEX_SOCIO_DEBE.ID_SOCIO%type,
p_fecha SD_KARDEX_SOCIO_DEBE.FECHA%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_saldo  SD_KARDEX_SOCIO_DEBE.SALDO_DEBE%type;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN
  v_res := '1';
    --1paso Obtener ultimo saldo del kardex cliente
                    select count(1) into v_cnt from SD_KARDEX_SOCIO_DEBE 
                    where ID_SOCIO    = p_id_socio
                    and FECHA  <p_fecha;
                     if v_cnt = 0 then
                        v_saldo :=0;
                        
                     else
                        SELECT SALDO_DEBE  INTO v_saldo
                        FROM(
                        select COALESCE(SALDO_DEBE ,0) SALDO_DEBE ,ROW_NUMBER() OVER( order by FECHA  desc, ID_KARDEX  desc )  as ROWN,FECHA  ,ID_KARDEX  
                        from SD_KARDEX_SOCIO_DEBE  
                        where ID_SOCIO    = p_id_socio
                        and FECHA  < p_fecha
                        ) where ROWN =1;
                     end if;
                     
                     FOR x IN (SELECT * FROM  SD_KARDEX_SOCIO_DEBE  
                        WHERE ID_SOCIO    = p_id_socio  AND
                        FECHA   >= p_fecha
                        order by FECHA   ASC ,ID_KARDEX  ASC ) LOOP 
                        v_saldo := v_saldo + x.DEBE     - x.AMORTIZACION    ;
                        update SD_KARDEX_SOCIO_DEBE  set SALDO_DEBE  = v_saldo  where ID_KARDEX   = x.ID_KARDEX  ;
                         v_res := '1';
                    END LOOP;
                      IF v_res = '1' THEN
                        UPDATE SD_SOCIOS     SET DEUDA   =v_saldo  WHERE  ID_SOCIO    = p_id_socio   ;
                         COMMIT;
                    END IF;
    --hacer recorrer todo el el kardex apartir de la fecha ingresada 
    --update saldo = saldo anterior + Consumo - amortizacion
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Deudas','P_SD_ACT_KARDEX_DEBE','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_EFECTIVO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_EFECTIVO(
p_id_caja SD_KARDEX_EFECTIVO.ID_CAJA %type,
p_fecha SD_KARDEX_EFECTIVO.FECHA%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_saldo  SD_KARDEX_EFECTIVO.SALDO%type;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN
  v_res := '1';
    --1paso Obtener ultimo saldo del kardex cliente
                    select count(1) into v_cnt from SD_KARDEX_EFECTIVO 
                    where ID_CAJA   = p_id_caja
                    and FECHA  <p_fecha;
                     if v_cnt = 0 then
                        v_saldo :=0;
                        
                     else
                        SELECT SALDO  INTO v_saldo
                        FROM(
                        select COALESCE(SALDO ,0) SALDO ,ROW_NUMBER() OVER( order by FECHA  desc, ID_KARDEX  desc )  as ROWN,FECHA  ,ID_KARDEX  
                        from SD_KARDEX_EFECTIVO  
                        where ID_CAJA   = p_id_caja
                        and FECHA  < p_fecha
                        ) where ROWN =1;
                     end if;
                     
                     FOR x IN (SELECT * FROM  SD_KARDEX_EFECTIVO  
                        WHERE ID_CAJA   = p_ID_CAJA  AND
                        FECHA   >= p_fecha
                        order by FECHA   ASC ,ID_KARDEX  ASC ) LOOP 
                        v_saldo := v_saldo + x.INGRESO    - x.EGRESO   ;
                        update SD_KARDEX_EFECTIVO  set SALDO = v_saldo  where ID_KARDEX   = x.ID_KARDEX  ;
                         v_res := '1';
                    END LOOP;
                      IF v_res = '1' THEN
                        UPDATE SD_CAJAS     SET SALDO   =v_saldo  WHERE ID_CAJA     =  p_ID_CAJA   ;
                         COMMIT;
                    END IF;
    --hacer recorrer todo el el kardex apartir de la fecha ingresada 
    --update saldo = saldo anterior + Consumo - amortizacion
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Efectivo','P_SD_ACT_KARDEX_EFECTIVO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_FM;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_FM(
p_id_chofer SD_KARDEX_FM.ID_CHOFER%type,
p_fecha SD_KARDEX_EFECTIVO.FECHA%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_saldo  SD_KARDEX_FM.SALDO%type;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN
    --1paso Obtener ultimo saldo del kardex cliente
                    select count(1) into v_cnt from SD_KARDEX_FM 
                    where ID_CHOFER   = p_id_chofer
                    and FECHA  <p_fecha;
                     if v_cnt = 0 then
                        v_saldo :=0;
                     else
                        SELECT SALDO  INTO v_saldo
                        FROM(
                        select COALESCE(SALDO ,0) SALDO ,ROW_NUMBER() OVER( order by FECHA  desc, ID_KARDEX  desc )  as ROWN,FECHA  ,ID_KARDEX  
                        from SD_KARDEX_FM  
                        where ID_CHOFER    = p_id_chofer
                        and FECHA  < p_fecha
                        ) where ROWN =1;
                     end if;
                     
                     FOR x IN (SELECT * FROM  SD_KARDEX_FM  
                        WHERE ID_CHOFER    = p_id_chofer  AND
                        FECHA   >= p_fecha
                        order by FECHA   ASC ,ID_KARDEX  ASC ) LOOP 
                        v_saldo := v_saldo + x.INGRESO    - x.EGRESO   ;
                        update SD_KARDEX_FM  set SALDO = v_saldo  where ID_KARDEX   = x.ID_KARDEX  ;
                         v_res := '1';
                    END LOOP;
                      IF v_res = '1' THEN
                        UPDATE SD_CHOFERES      SET FONDO_EMERGENCIA    =v_saldo  WHERE ID_CHOFER      =  p_id_chofer   ;
                         COMMIT;
                    END IF;
    --hacer recorrer todo el el kardex apartir de la fecha ingresada 
    --update saldo = saldo anterior + Consumo - amortizacion
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Fondo Emergencia','P_SD_ACT_KARDEX_FM','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_HOJA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_HOJA(
p_id_socio_movil SD_KARDEX_HOJAS.ID_SOCIO_MOVIL%type,
p_fecha SD_KARDEX_HOJAS.MES%type,
p_usr   VARCHAR2,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_cantidad_hojas NUMBER:=0;
 v_cantidad_reg NUMBER:=0;
 v_cantidad_oblig NUMBER :=0;
 v_debe NUMBER :=0;
 v_total_hoja NUMBER :=0;
   
 v_cantidad_hojas_oblig NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_date_valid DATE;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
 v_fecha_hasta DATE;
 v_fecha DATE;
BEGIN
  v_res := '1';
  --select to_date('01/05/2016','DD/MM/YYYY') from dual
  v_date_valid := TO_DATE('01/05/2016','DD/MM/YYYY');
  v_fecha :=  to_date(to_char(p_fecha,'MM-YYYY'),'MM-YYYY');
  v_fecha_hasta :=  to_date(to_char(add_months(sysdate,1),'MM-YYYY'),'MM-YYYY');
  P_REC_PARAMETROS('CANT_HOJA',1,v_cantidad_hojas_oblig);
  --dbms_output.put_line(v_fecha_hasta);
  IF v_fecha < v_date_valid THEN
        v_fecha := v_date_valid;
  END IF;
  WHILE v_fecha < v_fecha_hasta LOOP
     v_debe := 0;
            v_cnt :=0;
   SELECT COUNT(*) INTO v_cnt FROM SD_PERMISOS WHERE ID_SOCIO_MOVIL = p_id_socio_movil AND v_fecha >= FECHA_INI AND v_fecha < FECHA_FIN AND ESTADO = 'ACTIVO';
   IF v_cnt > 0 THEN
        SELECT CANT_HOJAS_OBLIG INTO v_cantidad_hojas_oblig FROM SD_PERMISOS WHERE ID_SOCIO_MOVIL = p_id_socio_movil AND v_fecha >= FECHA_INI AND v_fecha < FECHA_FIN  AND ESTADO = 'ACTIVO';
   ELSE
        IF v_fecha < TO_DATE('31/12/2016','DD/MM/YYYY') THEN
        v_cantidad_hojas_oblig := 18;
        ELSE
        P_REC_PARAMETROS('CANT_HOJA',1,v_cantidad_hojas_oblig);
        END IF;
      --   P_REC_PARAMETROS('CANT_HOJA',1,v_cantidad_hojas_oblig);
   END IF;
    dbms_output.put_line(v_cantidad_hojas_oblig);
    select count(*) INTO v_cnt FROM SD_KARDEX_HOJAS WHERE ID_SOCIO_MOVIL = p_id_socio_movil AND MES = v_fecha;
    select COUNT(*) INTO v_cantidad_hojas FROM SD_HOJAS_CONTROL WHERE ID_SOCIO_MOVIL = p_id_socio_movil AND TO_CHAR(FECHA_COMPRA , 'MM/YYYY' ) = TO_CHAR(v_fecha , 'MM/YYYY' ) AND ESTADO <> 'ANULADO';
    SELECT COALESCE (SUM(CANTIDAD),0) INTO v_cantidad_reg FROM SD_REGULARIZACIONES  WHERE ID_SOCIO_MOVIL = p_id_socio_movil AND TO_CHAR(MES , 'MM/YYYY' ) = TO_CHAR(v_fecha , 'MM/YYYY' ) AND ESTADO <> 'ANULADO';
    v_total_hoja := v_cantidad_hojas + v_cantidad_reg;
    IF v_cantidad_hojas_oblig > v_total_hoja AND v_date_valid <= v_fecha THEN
            v_debe := v_cantidad_hojas_oblig - v_total_hoja;
    END IF;
    IF v_cnt > 0 THEN
    
        UPDATE SD_KARDEX_HOJAS SET CANT_HOJAS = v_cantidad_hojas , CANT_REGULACIONES = v_cantidad_reg , CANT_HOJAS_OBLIG =  v_cantidad_hojas_oblig , DEBE = v_debe WHERE ID_SOCIO_MOVIL = p_id_socio_movil AND MES = v_fecha;
    ELSE 
        INSERT INTO SD_KARDEX_HOJAS (ID_KARDEX ,ID_SOCIO_MOVIL, MES, CANT_HOJAS, CANT_REGULACIONES ,CANT_HOJAS_OBLIG, LOGIN ,FECHA_REG , DEBE )
        VALUES (  Q_SD_KARDEX_HOJAS.nextval ,p_id_socio_movil, v_fecha, v_cantidad_hojas, v_cantidad_reg ,v_cantidad_hojas_oblig, p_usr ,sysdate ,v_debe );
   
    END IF;
    --dbms_output.put_line(v_fecha);
    v_fecha := add_months(v_fecha,1);
        dbms_output.put_line(v_fecha);
  END LOOP;
  
  
    
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_ACT_KARDEX_HOJA','P_SD_ACT_KARDEX_HOJA','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_SOCIO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_SOCIO(
p_id_socio SD_KARDEX_SOCIO.ID_SOCIO %type,
p_fecha SD_KARDEX_SOCIO.FECHA%type,
p_login   VARCHAR2,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_saldo  SD_KARDEX_SOCIO.SALDO%type;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN
v_res := '1';
    --1paso Obtener ultimo saldo del kardex cliente
                    select count(1) into v_cnt from SD_KARDEX_SOCIO 
                    where ID_SOCIO   = p_id_socio
                    and FECHA  <p_fecha;
                     if v_cnt = 0 then
                        v_saldo :=0;
                     else
                        SELECT SALDO  INTO v_saldo
                        FROM(
                        select COALESCE(SALDO ,0) SALDO ,ROW_NUMBER() OVER( order by FECHA  desc, ID_KARDEX  desc )  as ROWN,FECHA  ,ID_KARDEX  
                        from SD_KARDEX_SOCIO  
                        where ID_SOCIO   = p_id_socio
                        and FECHA  < p_fecha
                        ) where ROWN =1;
                     end if;
                     
                     FOR x IN (SELECT * FROM  SD_KARDEX_SOCIO 
                        WHERE ID_SOCIO   = p_id_socio  AND
                        FECHA   >= p_fecha
                        order by FECHA   ASC ,ID_KARDEX  ASC ) LOOP 
                        v_saldo := v_saldo + x.INGRESO    - x.EGRESO   ;
                        update SD_KARDEX_SOCIO  set SALDO = v_saldo  where ID_KARDEX   = x.ID_KARDEX  ;
                         v_res := '1';
                    END LOOP;
                      IF v_res = '1' THEN
                        UPDATE SD_SOCIOS    SET SALDO   =v_saldo  WHERE ID_SOCIO     =  p_id_socio   ;
                         COMMIT;
                    END IF;
    --hacer recorrer todo el el kardex apartir de la fecha ingresada 
    --update saldo = saldo anterior + Consumo - amortizacion
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Kardex Socio','P_SD_ACT_KARDEX_SOCIO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_SOCIO_MOVIL;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_SOCIO_MOVIL(
p_id_socio_movil SD_KARDEX_SOCIO_MOVIL.ID_SOCIO_MOVIL%type,
p_fecha SD_KARDEX_SOCIO_MOVIL.FECHA%type,
p_login   VARCHAR2,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_saldo  SD_KARDEX_SOCIO_MOVIL .SALDO%type;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN
v_res := '1';
    --1paso Obtener ultimo saldo del kardex cliente
                    select count(1) into v_cnt from SD_KARDEX_SOCIO_MOVIL  
                    where ID_SOCIO_MOVIL    = p_id_socio_movil
                    and FECHA  <p_fecha;
                     if v_cnt = 0 then
                        v_saldo :=0;
                     else
                        SELECT SALDO  INTO v_saldo
                        FROM(
                        select COALESCE(SALDO ,0) SALDO ,ROW_NUMBER() OVER( order by FECHA  desc, ID_KARDEX  desc )  as ROWN,FECHA  ,ID_KARDEX  
                        from SD_KARDEX_SOCIO_MOVIL   
                        where ID_SOCIO_MOVIL    = p_id_socio_movil
                        and FECHA  < p_fecha
                        ) where ROWN =1;
                     end if;
                     
                     FOR x IN (SELECT * FROM  SD_KARDEX_SOCIO_MOVIL  
                        WHERE ID_SOCIO_MOVIL    = p_id_socio_movil  AND
                        FECHA   >= p_fecha
                        order by FECHA   ASC ,ID_KARDEX  ASC ) LOOP 
                        v_saldo := v_saldo + x.INGRESO    - x.EGRESO   ;
                        update SD_KARDEX_SOCIO_MOVIL   set SALDO = v_saldo  where ID_KARDEX   = x.ID_KARDEX  ;
                         v_res := '1';
                    END LOOP;
                      IF v_res = '1' THEN
                        UPDATE SD_SOCIO_MOVILES     SET SALDO   =v_saldo  WHERE ID_SOCIO_MOVIL      =  p_id_socio_movil   ;
                         COMMIT;
                    END IF;
    --hacer recorrer todo el el kardex apartir de la fecha ingresada 
    --update saldo = saldo anterior + Consumo - amortizacion
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Kardex Socio','P_SD_ACT_KARDEX_SOCIO_MOVIL','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_OBLIGACIONES;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_OBLIGACIONES(
p_id_socio SINDICATO_121_2020.SD_OBLIGACIONES_SOCIO.ID_SOCIO%type,
p_id_obligacion SINDICATO_121_2020.SD_OBLIGACIONES_SOCIO.ID_OBLIGACION%type,
p_fecha SINDICATO_121_2020.SD_KARDEX_OBLIGACION.FECHA %type,
p_motivo SINDICATO_121_2020.SD_KARDEX_OBLIGACION.MOTIVO%type,
p_importe_nuevo SINDICATO_121_2020.SD_KARDEX_OBLIGACION.IMPORTE_NUEVO%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_importe NUMBER;
v_fecha DATE;
 v_institucion VARCHAR2(1000):='0';
 v_seguro VARCHAR2(1000):='0';
 v_canaston VARCHAR2(1000):='0';
BEGIN
IF p_id_socio  IS NULL OR p_fecha IS NULL OR p_motivo IS NULL
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN
        SELECT IMPORTE  INTO v_importe FROM SD_OBLIGACIONES_SOCIO WHERE ID_SOCIO= p_id_socio AND  ID_OBLIGACION =p_id_obligacion;
        IF v_importe = p_importe_nuevo THEN
        
           v_res := 'El importe es el mismo ';
        END IF;
        
        IF v_res =  '0' THEN
            UPDATE SD_OBLIGACIONES_SOCIO SET IMPORTE = p_importe_nuevo WHERE  ID_SOCIO= p_id_socio AND  ID_OBLIGACION =p_id_obligacion;
              INSERT INTO SD_KARDEX_OBLIGACION (ID_KARDEX ,ID_OBLIGACION ,MOTIVO ,FECHA, IMPORTE_ANTERIOR , IMPORTE_NUEVO, LOGIN ,FECHA_REG  )
             VALUES (Q_SD_KARDEX_OBLIGACION.nextval , p_id_obligacion ,p_motivo,p_fecha,v_importe, p_importe_nuevo,p_usr,sysdate);
        END IF;
        
         v_res := p_id_obligacion;
         COMMIT;
    

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_ACT_OBLIGACIONES','P_SD_ACT_OBLIGACIONES','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_PAGOS_SOCIOS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_PAGOS_SOCIOS(
p_id_socio_movil  SD_SOCIO_MOVILES  .ID_SOCIO_MOVIL  %type, 
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
v_nro_movil  NUMBER := 0;
v_total_retiro NUMBER := 0;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN

SELECT SUM(RETIRO) INTO v_total_retiro  FROM SD_RETIRO_SOCIO_MOVIL  where id_socio_movil = p_id_socio_movil and estado <>'ANULADO';

    IF v_total_retiro > 0 THEN
            FOR x IN ( SELECT AHO.ID_DETALLE , AHO.TOTAL_AHORRO FROM SD_DETALLE_CIERRES_AHORRO aho , SD_CIERRES  cie where  AHO.ID_CIERRE = CIE.ID_CIERRE AND aho.ID_SOCIO_MOVIL = p_id_socio_movil and CIE.ESTADO = 'ACTIVO'  order by cie.FECHA_REG ASC  ) LOOP
                IF v_total_retiro >= x.TOTAL_AHORRO THEN
                 UPDATE SD_DETALLE_CIERRES_AHORRO SET TOTAL_CANCELADO = x.TOTAL_AHORRO WHERE ID_DETALLE = x.ID_DETALLE;
                 v_total_retiro := v_total_retiro - x.TOTAL_AHORRO;
                ELSE 
                 
                 UPDATE SD_DETALLE_CIERRES_AHORRO SET TOTAL_CANCELADO = v_total_retiro WHERE ID_DETALLE = x.ID_DETALLE;
                 v_total_retiro := 0;
                END IF;
            END LOOP;
            
            v_res := '1';
          --  select to_date(to_char(sysdate,'DD/MM/YYYY'),'DD/MM/YYYY') from dual
    
    END IF;
     COMMIT;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_ACT_PAGOS_SOCIOS','P_SD_ACT_KARDEX_CIERRE_AHORRO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_PLAN_PAGOS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_PLAN_PAGOS(
p_id_prestamo SD_PRESTAMOS_POR_SOCIOS .ID_PRESTAMO %type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_saldo  SD_KARDEX_EFECTIVO.SALDO%type;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
 v_cancelado  NUMBER :=0;
 v_total_prestamo NUMBER := 0;
 v_total NUMBER :=0;
 v_pago NUMBER :=0;
 v_interes NUmBER := 0;
BEGIN
  v_res := '1';
  SELECT SUM(IMPORTE ) INTO v_cancelado FROM SD_PAGO_DE_PRESTAMOS WHERE ID_PRESTAMO = p_id_prestamo AND ESTADO != 'ANULADO';
  v_total :=  v_cancelado;
        
         FOR x IN (SELECT * FROM  SD_PLAN_DE_PAGO     WHERE ID_PRESTAMO   = p_id_prestamo    order by NRO_SEMANA   ASC ) LOOP 
         
                    SELECT IMPORTE_A_PAGAR , INTERES_A_PAGAR INTO v_pago , v_interes FROM SD_PLAN_DE_PAGO WHERE ID_PLAN  = x.ID_PLAN ;
                     IF  v_total >= (v_pago + v_interes) THEN
                        UPDATE SD_PLAN_DE_PAGO SET ESTADO = 'CANCELADO' WHERE  ID_PLAN  = x.ID_PLAN ;
                        v_total := v_total - (v_pago + v_interes);
                     END IF;   
         END LOOP;
    p_res := v_res;
    COMMIT;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Efectivo','P_SD_ACT_KARDEX_EFECTIVO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ALTA_AUTOS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ALTA_AUTOS(
p_id_auto SINDICATO_121_2020.SD_AUTOS.ID_AUTO%type,
p_tipo SINDICATO_121_2020.SD_AUTOS.TIPO%type,
p_color SINDICATO_121_2020.SD_AUTOS.COLOR%type,
p_marca SINDICATO_121_2020.SD_AUTOS.MARCA%type,
p_modelo SINDICATO_121_2020.SD_AUTOS.MODELO%type,
p_placa SINDICATO_121_2020.SD_AUTOS.PLACA%type,
p_motor SINDICATO_121_2020.SD_AUTOS.MOTOR%type,
p_chasis SINDICATO_121_2020.SD_AUTOS.CHASIS%type,
p_descripcion SINDICATO_121_2020.SD_AUTOS.DESCRIPCION%type,
p_fecha_alta SINDICATO_121_2020.SD_AUTOS.FECHA_ALTA%type,
p_fecha_baja SINDICATO_121_2020.SD_AUTOS.FECHA_BAJA%type,
p_id_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_id_auto SINDICATO_121_2020.SD_AUTOS.ID_AUTO%type;
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
BEGIN
IF p_id_auto  IS NULL OR p_tipo IS NULL OR p_color IS NULL OR p_fecha_alta IS NULL OR p_placa IS NULL
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
    if p_id_auto = 0 THEN
       SELECT count(*) into v_cnt FROM SD_AUTOS WHERE PLACA = p_placa;
       if v_cnt > 0 THEN
            v_res := 'Existe ya un automovil con la misma placa ';
       END IF;
       IF v_res = '0' THEN
            v_id_auto :=  Q_SD_AUTOS.nextval;
            INSERT INTO SINDICATO_121_2020.SD_AUTOS (id_auto  ,tipo ,color ,marca ,modelo ,placa ,motor ,chasis ,descripcion ,fecha_alta ,fecha_baja  ,fecha_reg ,login_usr )
            VALUES(v_id_auto  ,p_tipo ,p_color ,p_marca ,p_modelo ,p_placa ,p_motor ,p_chasis ,p_descripcion ,p_fecha_alta ,p_fecha_baja  ,sysdate ,p_id_usr );
            v_res := '1';
       END IF;
    else
        v_id_auto := p_id_auto;
        SELECT count(*) into v_cnt FROM SD_AUTOS WHERE PLACA = p_placa  AND p_id_AUTO != v_id_auto;
          if v_cnt > 0 THEN
             v_res := 'Existe ya un automovil con la misma placa ';
           END IF;
           IF v_res = '0' THEN
           UPDATE SD_AUTOS SET tipo = p_tipo , COLOR = p_color , MARCA = p_marca ,MODELO = p_modelo ,  PLACA = p_placa , MOTOR = p_motor , CHASIS = p_chasis , DESCRIPCION = p_descripcion , FECHA_ALTA = p_fecha_alta  WHERE ID_AUTO = v_id_auto; 
            v_res := '1';
       END IF;
         
    end if;

END IF;
IF v_res = '1' THEN 
    COMMIT;
ELSE 
    ROLLBACK;
END IF;
 
p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_ALTA_SD_AUTOS','P_SD_ALTA_SD_AUTOS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ALTA_LISTA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ALTA_LISTA(
 p_lista       IN SD_LISTAS.LISTA%TYPE,
 p_descripcion IN SD_LISTAS.DESCRIPCION%TYPE,
 p_tam_limite  IN SD_LISTAS.TAM_LIMITE%TYPE,
 p_tipo_valor  IN SD_LISTAS.TIPO_VALOR%TYPE,
 p_mayus_minus IN SD_LISTAS.MAYUS_MINUS%TYPE,
 p_id_usr   NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
 /*
 Finalidad: Procedimiento para registrar el alta la LISTA
 Recibe:  p_lista  .. p_num_proy -> Parametros del elemento
 Retorna: p_res(parametro de salida)->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 26/07/2013
 Autor: Henry Terceros 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN

  -- Validamos nulos
  IF p_lista IS NULL OR p_descripcion IS NULL OR p_tam_limite IS NULL OR p_tipo_valor IS NULL OR p_mayus_minus IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Verificamos que la LISTA no exista 
    SELECT COUNT(*) INTO v_cnt FROM SD_listas WHERE lista = TRIM(p_lista);
    IF v_cnt > 0 THEN
      v_res := 'Ya existe la lista con dicho nombre.';
    END IF;
  END IF;
  IF v_res='0' THEN
      -- Creamos la LISTA
      INSERT INTO SD_listas(id_lista, lista, descripcion, tam_limite, tipo_valor, mayus_minus,estado)
      VALUES(q_SD_listas.nextval, p_lista, p_descripcion, p_tam_limite, p_tipo_valor, p_mayus_minus, 'A');

      COMMIT;
      
      v_res := '1';
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Alta Lista','P_SD_ALTA_LISTA','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ALTA_SD_CHOFERES;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ALTA_SD_CHOFERES(
p_id_chofer SINDICATO_121_2020.SD_CHOFERES.ID_CHOFER%type,
p_nro_chofer SINDICATO_121_2020.SD_CHOFERES.NRO_CHOFER%type,
p_nombre SINDICATO_121_2020.SD_CHOFERES.NOMBRE%type,
p_apellido_paterno SINDICATO_121_2020.SD_CHOFERES.APELLIDO_PATERNO%type,
p_apellido_materno SINDICATO_121_2020.SD_CHOFERES.APELLIDO_MATERNO%type,
p_nro_licencia SINDICATO_121_2020.SD_CHOFERES.NRO_LICENCIA%type,
p_categoria_lic SINDICATO_121_2020.SD_CHOFERES.CATEGORIA_LIC%type,
p_ci SINDICATO_121_2020.SD_CHOFERES.CI%type,
p_expedido SINDICATO_121_2020.SD_CHOFERES.EXPEDIDO%type,
p_fecha_nac SINDICATO_121_2020.SD_CHOFERES.FECHA_NAC%type,
p_fecha_ingreso SINDICATO_121_2020.SD_CHOFERES.FECHA_INGRESO%type,
p_domicilio SINDICATO_121_2020.SD_CHOFERES.DOMICILIO%type,
p_observacion SINDICATO_121_2020.SD_CHOFERES.OBSERVACION%type,
p_estado_civil SINDICATO_121_2020.SD_CHOFERES.ESTADO_CIVIL%type,
p_telefono SINDICATO_121_2020.SD_CHOFERES.TELEFONO%type,
p_celular SINDICATO_121_2020.SD_CHOFERES.CELULAR%type,
p_id_socio SINDICATO_121_2020.SD_CHOFERES.ID_SOCIO%type,
p_id_usr NUMBER,
p_res OUT VARCHAR2
)
IS
v_id_chofer SINDICATO_121_2020.SD_CHOFERES.ID_CHOFER%type;
v_id_socio SINDICATO_121_2020.SD_CHOFERES.ID_SOCIO%type;
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
BEGIN
IF p_id_chofer  IS NULL OR p_nombre IS NULL OR p_apellido_paterno IS NULL OR p_apellido_materno IS NULL OR p_ci IS NULL OR p_expedido IS NULL OR p_fecha_nac IS NULL OR p_fecha_ingreso IS NULL OR p_domicilio IS NULL OR p_observacion IS NULL OR p_estado_civil IS NULL OR p_id_socio IS NULL
THEN
v_res := 'Faltan parametros.';
END IF;
IF p_id_chofer =  0 THEN
        SELECT COUNT(*) into v_cnt FROM SD_CHOFERES WHERE NRO_CHOFER = p_nro_chofer ;
        IF v_cnt > 0 THEN
           v_res := 'No puede usar ese nro de chofer ya esta siendo utilizando por otra persona.';
        END IF;
    IF v_res='0' THEN
        v_id_chofer:= Q_SD_CHOFERES.nextval;
        INSERT INTO SINDICATO_121_2020.SD_CHOFERES (id_chofer ,nro_chofer ,nombre ,apellido_paterno 
        ,apellido_materno ,nro_licencia ,categoria_lic ,ci ,expedido ,fecha_nac ,fecha_ingreso ,
        fecha_baja ,domicilio ,observacion ,estado_civil ,id_socio ,fecha_reg ,id_usr ,estado, telefono, celular )

        VALUES( v_id_chofer,p_nro_chofer ,p_nombre ,p_apellido_paterno ,p_apellido_materno
         ,p_nro_licencia ,p_categoria_lic ,p_ci ,p_expedido ,p_fecha_nac ,p_fecha_ingreso ,
         null ,p_domicilio ,p_observacion ,p_estado_civil ,p_id_socio ,sysdate ,p_id_usr ,'ALTA', p_telefono, p_celular );
         
         INSERT INTO SINDICATO_121_2020.SD_GARANTES(ID_GARANTE ,ID_CHOFER, ID_SOCIO, OBSERVACION ,FECHA_INI, FECHA_REG ,ESTADO ,ID_USR  )
         VALUES (Q_SD_GARANTES.nextval,v_id_chofer,p_id_socio,'CREACION CHOFER',SYSDATE,SYSDATE,'ACTIVO',p_id_usr);
        v_res := v_id_chofer;
    END IF;
ELSE
        SELECT COUNT(*) into v_cnt FROM SD_CHOFERES WHERE NRO_CHOFER = p_nro_chofer AND ID_CHOFER <> p_id_chofer;
        IF v_cnt > 0 THEN
           v_res := 'No puede usar ese nro de chofer ya esta siendo utilizando por otra persona.';
        END IF;
    IF v_res='0' THEN
         UPDATE SD_CHOFERES SET NRO_CHOFER=p_nro_chofer , NOMBRE = p_nombre , APELLIDO_PATERNO = p_APELLIDO_PATERNO ,
          APELLIDO_MATERNO = p_APELLIDO_MATERNO , NRO_LICENCIA = p_NRO_LICENCIA  , CATEGORIA_LIC = p_CATEGORIA_LIC  ,
           CI = p_CI , EXPEDIDO = p_EXPEDIDO , FECHA_NAC  = p_FECHA_NAC ,FECHA_INGRESO = p_FECHA_INGRESO ,
           DOMICILIO = p_DOMICILIO  , OBSERVACION = p_OBSERVACION ,ESTADO_CIVIL = p_ESTADO_CIVIL , 
           TELEFONO = p_TELEFONO, CELULAR = p_celular, ID_SOCIO = p_id_socio  WHERE ID_CHOFER = p_id_chofer;
           
           --SELECT ID_SOCIO into v_id_socio FROM  
           v_res := p_id_chofer;
    END IF;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_EE_ALTA_SD_CHOFERES','P_EE_ALTA_SD_CHOFERES','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ALTA_SD_FAMILIARES;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ALTA_SD_FAMILIARES(
p_id_familiar SINDICATO_121_2020.SD_FAMILIARES.ID_FAMILIAR%type,
p_id_socio SINDICATO_121_2020.SD_FAMILIARES.ID_SOCIO%type,
p_id_chofer SINDICATO_121_2020.SD_FAMILIARES.ID_CHOFER%type,
p_nombre SINDICATO_121_2020.SD_FAMILIARES.NOMBRE%type,
p_apellido_paterno SINDICATO_121_2020.SD_FAMILIARES.APELLIDO_PATERNO%type,
p_apellido_materno SINDICATO_121_2020.SD_FAMILIARES.APELLIDO_MATERNO%type,
p_ci SINDICATO_121_2020.SD_FAMILIARES.CI%type,
p_expedido SINDICATO_121_2020.SD_FAMILIARES.EXPEDIDO%type,
p_fecha_nac SINDICATO_121_2020.SD_FAMILIARES.FECHA_NAC%type,
p_parentesco SINDICATO_121_2020.SD_FAMILIARES.PARENTESCO%type,
p_observacion SINDICATO_121_2020.SD_FAMILIARES.OBSERVACION%type,
p_direccion SINDICATO_121_2020.SD_FAMILIARES.DIRECCION%type,
p_telefono SINDICATO_121_2020.SD_FAMILIARES.TELEFONO%type,
p_id_usr NUMBER,
p_res OUT VARCHAR2
)
IS
v_id_familiar SINDICATO_121_2020.SD_FAMILIARES.ID_FAMILIAR%type;
v_cnt NUMBER:=0;
v_nro  NUMBER := 0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
BEGIN
IF p_id_familiar IS NULL OR p_nombre IS NULL  OR p_parentesco IS NULL
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
    IF p_id_familiar = 0 THEN
       
        v_id_familiar := Q_SD_FAMILIARES.nextval;
        INSERT INTO SINDICATO_121_2020.SD_FAMILIARES (id_familiar ,id_socio ,id_chofer ,nombre ,apellido_paterno ,apellido_materno ,ci ,expedido ,fecha_nac ,parentesco ,observacion ,fecha_reg ,id_usr, direccion, telefono )
        VALUES(v_id_familiar ,p_id_socio ,p_id_chofer ,p_nombre ,p_apellido_paterno ,p_apellido_materno ,p_ci ,p_expedido ,p_fecha_nac ,p_parentesco ,p_observacion ,sysdate ,p_id_usr, p_direccion, p_telefono );
        v_res :=  v_id_familiar;
   ELSE
      UPDATE SD_FAMILIARES SET NOMBRE = p_NOMBRE  , APELLIDO_PATERNO = p_APELLIDO_PATERNO , 
      APELLIDO_MATERNO = p_APELLIDO_MATERNO  , CI = p_CI ,EXPEDIDO = p_EXPEDIDO , 
      FECHA_NAC = p_FECHA_NAC , PARENTESCO = p_PARENTESCO , 
      OBSERVACION = p_OBSERVACION, DIRECCION = p_direccion, TELEFONO = p_telefono   WHERE ID_FAMILIAR = p_id_familiar ;
          v_res :=  p_id_familiar;
   END IF;
END IF;
p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_EE_ALTA_SD_FAMILIARES','P_EE_ALTA_SD_FAMILIARES','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ALTA_SD_SOCIOS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ALTA_SD_SOCIOS(
p_id_socio SINDICATO_121_2020.SD_SOCIOS.ID_SOCIO%type,
p_nombre SINDICATO_121_2020.SD_SOCIOS.NOMBRE%type,
p_apellido_paterno SINDICATO_121_2020.SD_SOCIOS.APELLIDO_PATERNO%type,
p_apellido_materno SINDICATO_121_2020.SD_SOCIOS.APELLIDO_MATERNO%type,
p_nro_licencia SINDICATO_121_2020.SD_SOCIOS.NRO_LICENCIA%type,
p_categoria_lic SINDICATO_121_2020.SD_SOCIOS.CATEGORIA_LIC%type,
p_ci SINDICATO_121_2020.SD_SOCIOS.CI%type,
p_expedido SINDICATO_121_2020.SD_SOCIOS.EXPEDIDO%type,
p_fecha_nac SINDICATO_121_2020.SD_SOCIOS.FECHA_NAC%type,
p_fecha_ingreso SINDICATO_121_2020.SD_SOCIOS.FECHA_INGRESO%type,
p_domicilio SINDICATO_121_2020.SD_SOCIOS.DOMICILIO%type,
p_observacion SINDICATO_121_2020.SD_SOCIOS.OBSERVACION%type,
p_telefono SINDICATO_121_2020.SD_SOCIOS.TELEFONO%type,
p_celular SINDICATO_121_2020.SD_SOCIOS.CELULAR%type,
p_estado_civil SINDICATO_121_2020.SD_SOCIOS.ESTADO_CIVIL%type,
p_id_usr NUMBER,
p_res OUT VARCHAR2
)
IS
v_id_socio SINDICATO_121_2020.SD_SOCIOS.ID_SOCIO%type;
v_nro SINDICATO_121_2020.SD_SOCIOS.NRO_SOCIO%type;
v_cnt NUMBER:=0;
v_nombre VARCHAR2(255) := '0';
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES .cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.SD_AUX_LOG_ERRORES.id_log%type;
BEGIN
IF p_id_socio  IS NULL OR p_nombre IS NULL OR p_apellido_paterno  IS NULL OR p_ci IS NULL OR p_expedido IS NULL OR p_fecha_nac IS NULL OR p_fecha_ingreso IS NULL OR p_domicilio IS NULL OR p_observacion IS NULL OR p_estado_civil IS NULL
THEN
v_res := 'Faltan parametros.';
END IF;
IF p_id_socio = 0 THEN
    IF v_res='0' THEN
            SELECT COUNT(*) into v_cnt FROM   SD_SOCIOS WHERE CI = p_ci ;
            IF v_cnt > 0 THEN
                    SELECT  NOMBRE ||'  '||APELLIDO_PATERNO into v_nombre FROM   SD_SOCIOS WHERE CI = p_ci ;
                    v_res := 'No puede usar ese CI. ya esta siendo utilizando por :  '||v_nombre;
            END IF;
            IF v_res='0' THEN
               v_id_socio := Q_SD_SOCIOS.nextval;
              
                INSERT INTO SINDICATO_121_2020.SD_SOCIOS (id_socio  , NRO_SOCIO , nombre ,apellido_paterno ,apellido_materno ,nro_licencia ,categoria_lic ,ci ,expedido ,fecha_nac ,fecha_ingreso ,fecha_baja ,domicilio ,observacion ,estado_civil ,fecha_reg ,id_usr ,estado ,telefono , celular)
                VALUES(v_id_socio  , v_id_socio,p_nombre ,p_apellido_paterno ,p_apellido_materno ,p_nro_licencia ,p_categoria_lic ,p_ci ,p_expedido ,p_fecha_nac ,p_fecha_ingreso ,null ,p_domicilio ,p_observacion ,p_estado_civil ,sysdate ,p_id_usr ,'NUEVO' ,p_telefono , p_celular);
                v_res := v_id_socio;
             END IF;
    END IF;
ELSE
      SELECT COUNT(*) into v_cnt FROM   SD_SOCIOS WHERE CI = p_ci AND ID_SOCIO <> p_id_socio;
      IF v_cnt > 0 THEN
                    v_res := 'No puede usar ese nro CI de socio ya esta siendo utilizando por otra persona.';
      END IF;
         IF v_res='0' THEN
              
         
                UPDATE SD_SOCIOS SET 
                 NOMBRE = p_NOMBRE , APELLIDO_PATERNO = p_APELLIDO_PATERNO , APELLIDO_MATERNO = p_APELLIDO_MATERNO , NRO_LICENCIA = p_NRO_LICENCIA  , CATEGORIA_LIC = p_CATEGORIA_LIC  , CI = p_CI , EXPEDIDO = p_EXPEDIDO , FECHA_NAC  = p_FECHA_NAC ,FECHA_INGRESO = p_FECHA_INGRESO ,DOMICILIO = p_DOMICILIO  , OBSERVACION = p_OBSERVACION ,ESTADO_CIVIL = p_ESTADO_CIVIL , TELEFONO = p_TELEFONO , CELULAR = p_CELULAR  WHERE ID_SOCIO = p_id_socio;
                 v_res := p_id_socio;
          END IF;
END IF;
p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_EE_ALTA_SD_SOCIOS','P_EE_ALTA_SD_SOCIOS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ANULAR_HOJA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ANULAR_HOJA(
p_id_hoja  SINDICATO_121_2020.SD_HOJAS_CONTROL.ID_HOJA%type,
p_observacion IN SD_HOJAS_CONTROL.OBSERVACION%TYPE,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id_anulacion  NUMBER := 0;
v_fecha DATE;
v_id_socio_movil NUMBER;

BEGIN
IF p_id_hoja  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN
           
        SELECT COUNT(*) INTO v_cnt FROM SD_HOJAS_CONTROL WHERE ID_HOJA = p_id_hoja AND ESTADO = 'NUEVO' ;
        IF v_cnt > 0 THEN
                  v_id_anulacion := Q_SD_ANULACIONES.nextval;
                  SELECT FECHA_COMPRA , ID_SOCIO_MOVIL  INTO v_fecha , v_id_socio_movil  FROM SD_HOJAS_CONTROL WHERE ID_HOJA = p_id_hoja ;
                  UPDATE SD_HOJAS_CONTROL SET OBSERVACION  = p_observacion , ESTADO = 'ANULADO' WHERE ID_HOJA = p_id_hoja;
                  UPDATE SD_DETALLES_HOJAS_USO SET ESTADO = 'ANULADO' WHERE  ID_HOJA = p_id_hoja;
                  INSERT INTO SD_ANULACIONES (ID_ANULACION, ID_HOJA ,OBSERVACION ,FECHA_REG ,LOGIN_USR)
                  VALUES(v_id_anulacion , p_id_hoja , p_observacion , sysdate ,p_usr  ); 
                  DELETE FROM SD_KARDEX_EFECTIVO  WHERE ID_OPERACION  = p_id_hoja AND OPERACION ='VENTA HOJA';
                   commit;
                   
                   P_SD_ACT_KARDEX_HOJA(v_id_socio_movil,v_fecha ,p_usr,v_res);
                    FOR x IN (select id_caja from SD_OBLIGACIONES_HOJA group by id_caja ) LOOP
                        P_SD_ACT_KARDEX_EFECTIVO(x.id_caja,v_fecha ,1 ,v_res);
                        
                    END LOOP;
                    v_res := '1';
                   --P_SD_ACT_KARDEX_EFECTIVO(v_id_caja, p_fecha ,1,v_res); 
        ELSE 
           v_res := 'No existe hoja de control o esta en estado diferente a NUEVO.';
        END IF;
 
END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_ANULAR_HOJA','P_SD_ANULAR_HOJA','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ANULAR_PERMISOS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ANULAR_PERMISOS(
 p_id_permiso       IN SD_PERMISOS.ID_PERMISO%TYPE,
 p_observacion      IN SD_PERMISOS.OBSERVACION_BAJA%TYPE,
 p_login_usr   VARCHAR,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
 v_fecha DATE;
v_id_socio_movil NUMBER;
BEGIN

  -- Validamos nulos
  IF p_id_permiso IS NULL OR p_observacion IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
      -- Creamos verificamos si existe algun permiso dentro del rango de fecha
      
      SELECT COUNT(*) INTO v_cnt FROM SD_PERMISOS WHERE ID_PERMISO  = p_id_permiso AND ESTADO = 'ACTIVO';
      
      IF v_cnt  = 0 THEN
        
             v_res := 'No Existe el Permiso Vuelva a Intentarlo';
     
      END IF;
      
      
     IF v_res='0'  THEN
            SELECT ID_SOCIO_MOVIL , FECHA_INI INTO v_id_socio_movil , v_fecha FROM SD_PERMISOS WHERE  ID_PERMISO  = p_id_permiso;
            UPDATE SD_PERMISOS SET ESTADO = 'ANULADO' , FECHA_BAJA =sysdate ,  OBSERVACION_BAJA = p_observacion , LOGIN_BAJA = p_login_usr WHERE ID_PERMISO  = p_id_permiso;
            
            
             P_SD_ACT_KARDEX_HOJA(v_id_socio_movil, v_fecha ,p_login_usr,v_res);
    END IF;
      
      COMMIT;
      
      v_res := '1';
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Alta P_SD_ANULAR_PERMISOS','P_SD_ANULAR_PERMISOS','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ANULAR_REGULACION;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ANULAR_REGULACION(
p_id_regulacion  SINDICATO_121_2020.SD_REGULARIZACIONES.ID_REGULACION %type,
p_observacion IN SD_REGULARIZACIONES.OBSERVACION%TYPE,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id_anulacion  NUMBER := 0;
v_fecha DATE;
v_id_socio_movil NUMBER;
v_mes DATE;
BEGIN
IF p_id_regulacion  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN
           
        SELECT COUNT(*) INTO v_cnt FROM SD_REGULARIZACIONES  WHERE ID_REGULACION  = p_id_regulacion AND ESTADO = 'NUEVO' ;
        IF v_cnt > 0 THEN
                  SELECT FECHA_COMPRA ,ID_SOCIO_MOVIL , MES INTO v_fecha ,v_id_socio_movil , v_mes FROM SD_REGULARIZACIONES WHERE ID_REGULACION  = p_id_regulacion ;
                  UPDATE SD_REGULARIZACIONES SET OBSERVACION  = OBSERVACION ||' - ANULADO' , ESTADO = 'ANULADO' WHERE ID_REGULACION = p_id_regulacion;
                  DELETE FROM SD_KARDEX_EFECTIVO  WHERE ID_OPERACION  = p_id_regulacion AND OPERACION ='REGULACION';
                   commit;
                   
                   P_SD_ACT_KARDEX_HOJA(v_id_socio_movil,v_mes  ,p_usr,v_res);
                   
                    FOR x IN (select id_caja_reg from SD_OBLIGACIONES_HOJA group by id_caja_reg ) LOOP
                        P_SD_ACT_KARDEX_EFECTIVO(x.id_caja_reg,v_fecha ,1 ,v_res);
                        
                    END LOOP;
                    v_res := '1';
                   --P_SD_ACT_KARDEX_EFECTIVO(v_id_caja, p_fecha ,1,v_res); 
        ELSE 
           v_res := 'No existe hoja de control o esta en estado diferente a NUEVO.';
        END IF;
 
END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_ANULAR_REGULACION','P_SD_ANULAR_REGULACION','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_BAJA_SOCIO_MOVILES;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_BAJA_SOCIO_MOVILES(
 p_id_socio_movil  IN SD_SOCIO_MOVILES.ID_SOCIO_MOVIL%TYPE,
 p_fecha_baja  IN SD_SOCIO_MOVILES.FECHA_BAJA%TYPE,
 p_observacion  IN SD_SOCIO_MOVILES.OBSERVACION%TYPE,
 p_id_usr  IN SD_SOCIO_MOVILES.ID_USR%TYPE,
 p_res OUT  VARCHAR2
)
/*
 Finalidad: Procedimiento para grabar el alta o modificacion de SOCIO_MOVILES
 Recibe:  __ , __ , etc -> Parametros 
         p_id_socio_movil  -> 
         p_id_socio  -> 
         p_id_movil  -> 
         p_descripcion  -> 
         p_tipo_movil  -> 
         p_fecha_alta  -> 
         p_fecha_baja  -> 
         p_observacion  -> 
         p_fecha_reg  -> 
         p_id_usr  -> 
         p_estado  -> 
 Retorna: p_res ->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 08-JUL-14
 Autor: [nombre] [apellido]
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0'; 
 v_sql VARCHAR2(2000);
 v_sql1 VARCHAR2(200);
 v_tipo_oper VARCHAR2(10);
 v_rg    SD_SOCIO_MOVILES%ROWTYPE;
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
 v_id       NUMBER := 0;
BEGIN
  -- Validamos nulos
  IF p_id_socio_movil IS NULL OR p_fecha_baja IS NULL OR p_observacion IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
   IF v_res = '0' THEN
        SELECT COUNT(*) INTO v_cnt  FROM SD_HOJAS_CONTROL  WHERE ID_SOCIO_MOVIL = p_id_socio_movil and ESTADO = 'NUEVO';
        IF v_cnt > 0 THEN
            v_res := 'Tiene  Hojas en estado NUEVO. El Movil no tienen que tener Hojas en Estado NUEVO';
        ELSE
            SELECT SALDO INTO v_cnt FROM SD_SOCIO_MOVILES      WHERE ID_SOCIO_MOVIL = p_id_socio_movil ;
            IF v_cnt > 0 THEN
                v_res := 'Tiene Ahorros Generados. El Movil no debe de contar con saldo';
            END IF;
                    
            IF v_res = '0' THEN
                UPDATE SD_SOCIO_MOVILES SET ESTADO = 'BAJA' , OBSERVACION  = p_observacion ,     FECHA_BAJA   = p_fecha_baja  , ID_USR   = p_id_usr    WHERE ID_SOCIO_MOVIL  = p_id_socio_movil ;
                v_res :=  p_id_socio_movil;
                commit;
            END IF;    
    
        END IF;
       
   END IF;
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC, v_errD, 'ADM. SOCIO_MOVILES', 'P_SD_BAJA_SOCIO_MOVILES', v_sql, p_id_usr, v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_CAMBIO_GARANTE;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_CAMBIO_GARANTE(
p_id_chofer SINDICATO_121_2020.SD_GARANTES .ID_CHOFER%type,
p_fecha_ini SINDICATO_121_2020.SD_GARANTES.FECHA_INI %type,
p_observacion SINDICATO_121_2020.SD_GARANTES.OBSERVACION%type,
p_id_socio SINDICATO_121_2020.SD_GARANTES.ID_SOCIO%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
BEGIN
IF p_id_chofer  IS NULL OR p_fecha_ini IS NULL OR p_id_socio IS NULL OR p_observacion IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN
      
        SELECT FECHA_INI INTO v_fecha FROM SD_GARANTES WHERE id_chofer = p_id_chofer AND ESTADO = 'ACTIVO';
        IF p_fecha_ini < v_fecha THEN
            v_res := 'la fecha no puede ser menor que el ultimo cambio de garante';
        END IF;
        IF v_res =  '0' THEN
           UPDATE SD_GARANTES SET ESTADO = 'INACTIVO' , FECHA_FIN = p_fecha_ini WHERE id_chofer = p_id_chofer AND ESTADO = 'ACTIVO';
           commit;
            v_id:= Q_SD_GARANTES.nextval;
            INSERT INTO SINDICATO_121_2020.SD_GARANTES  (ID_GARANTE, ID_CHOFER ,ID_SOCIO ,OBSERVACION ,FECHA_INI,  FECHA_REG ,ESTADO, LOGIN  )
            VALUES (v_id,p_id_chofer ,p_id_socio ,p_observacion , p_fecha_ini , sysdate , 'ACTIVO', p_usr );

            
          
            UPDATE SD_CHOFERES  SET ID_SOCIO  = p_id_socio  WHERE id_chofer = p_id_chofer;
            v_res := v_id;
            COMMIT;
       END IF;
    

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_CAMBIO_GARANTE','P_SD_CAMBIO_GARANTE','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_CREAR_OBLIGACIONES;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_CREAR_OBLIGACIONES(
p_id_socio SINDICATO_121_2020.SD_OBLIGACIONES_SOCIO.ID_SOCIO%type,
p_fecha SINDICATO_121_2020.SD_KARDEX_OBLIGACION.FECHA %type,
p_motivo SINDICATO_121_2020.SD_KARDEX_OBLIGACION.MOTIVO%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
 v_institucion VARCHAR2(1000):='0';
 v_seguro VARCHAR2(1000):='0';
 v_canaston VARCHAR2(1000):='0';
BEGIN
IF p_id_socio  IS NULL OR p_fecha IS NULL OR p_motivo IS NULL
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN
        P_REC_PARAMETROS('INSTITUCION',1,v_institucion);
        P_REC_PARAMETROS('SEGURO',1,v_seguro);
        P_REC_PARAMETROS('CANASTON',1,v_canaston);
        v_id := Q_SD_OBLIGACIONES_SOCIO.nextval;
        INSERT INTO SD_OBLIGACIONES_SOCIO (ID_OBLIGACION, ID_SOCIO ,OBLIGACION ,IMPORTE ,FECHA_REG, LOGIN )
        VALUES(v_id,p_id_socio,'INSTITUCION',v_institucion,sysdate,p_usr);
        
        INSERT INTO SD_KARDEX_OBLIGACION (ID_KARDEX ,ID_OBLIGACION ,MOTIVO ,FECHA, IMPORTE_ANTERIOR , IMPORTE_NUEVO, LOGIN ,FECHA_REG  )
        VALUES (Q_SD_KARDEX_OBLIGACION.nextval , v_id ,p_motivo,p_fecha,0, v_institucion,p_usr,sysdate);
        
          v_id := Q_SD_OBLIGACIONES_SOCIO.nextval;
        INSERT INTO SD_OBLIGACIONES_SOCIO (ID_OBLIGACION, ID_SOCIO ,OBLIGACION ,IMPORTE ,FECHA_REG, LOGIN )
        VALUES(v_id,p_id_socio,'SEGURO',v_seguro,sysdate,p_usr);
        
        INSERT INTO SD_KARDEX_OBLIGACION (ID_KARDEX ,ID_OBLIGACION ,MOTIVO ,FECHA, IMPORTE_ANTERIOR , IMPORTE_NUEVO, LOGIN ,FECHA_REG  )
        VALUES (Q_SD_KARDEX_OBLIGACION.nextval , v_id , p_motivo,p_fecha,0, v_seguro,p_usr,sysdate);
        
          v_id := Q_SD_OBLIGACIONES_SOCIO.nextval;
        INSERT INTO SD_OBLIGACIONES_SOCIO (ID_OBLIGACION, ID_SOCIO ,OBLIGACION ,IMPORTE ,FECHA_REG, LOGIN )
        VALUES(v_id,p_id_socio,'CANASTON',v_canaston,sysdate,p_usr);
        
        INSERT INTO SD_KARDEX_OBLIGACION (ID_KARDEX ,ID_OBLIGACION ,MOTIVO ,FECHA, IMPORTE_ANTERIOR , IMPORTE_NUEVO, LOGIN ,FECHA_REG  )
        VALUES (Q_SD_KARDEX_OBLIGACION.nextval , v_id , p_motivo,p_fecha,0, v_canaston,p_usr,sysdate);        
         v_res := v_id;
         COMMIT;
    

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_CREAR_OBLIGACIONES','P_SD_CREAR_OBLIGACIONES','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ELIMINAR_CAJA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ELIMINAR_CAJA(
 p_id SD_CAJAS.ID_CAJA %type,
 p_id_usr   NUMBER,
 p_res OUT  VARCHAR2
)

IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0'; 
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN

  -- Validamos nulos
  IF p_id IS NULL THEN
    v_res := 'Faltan parámetros.';
  END IF;
  
  IF v_res='0' THEN
      
      SELECT COUNT(*) INTO v_cnt FROM SD_KARDEX_EFECTIVO 
      WHERE ID_CAJA = p_id AND ID_OPERACION <> p_id AND OPERACION <> 'CAJA' ;
      
      IF v_cnt > 0 THEN
        v_res := 'Existen transacciones asociadas a esta caja.';
      ELSE
        DELETE FROM SD_KARDEX_EFECTIVO WHERE ID_CAJA = p_id AND ID_OPERACION = p_id AND OPERACION = 'CAJA';
        DELETE FROM  SD_CAJAS  WHERE ID_CAJA = p_id;    
        v_res := '1';  
      END IF;  
            
  END IF;
   IF v_res = '1' THEN
     COMMIT;
   END IF;  
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Modulo Efectivo','P_SD_ELIMINAR_CAJA','-','-',v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ELIMINAR_MORA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ELIMINAR_MORA(
 p_id_mora IN SD_PRESTAMOS_MORA .ID_MORA %TYPE,
 p_id_usr   NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
 /*
 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN

  -- Validamos nulos
  IF p_id_mora IS NULL  THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Verificamos que la LISTA no exista 
    SELECT COUNT(*) INTO v_cnt FROM SD_PRESTAMOS_MORA   WHERE ID_MORA   = p_id_mora;
    IF v_cnt = 0 THEN
      v_res := 'No existe la Mora.';
    END IF;
  END IF;
  IF v_res='0' THEN
      -- Creamos la LISTA
      DELETE FROM SD_PRESTAMOS_MORA  WHERE ID_MORA  = p_id_mora ;

      COMMIT;
      
      v_res := '1';
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Prestamos','P_SD_ELIMINAR_MORA','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ELIMINAR_PERFIL_OPCION;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ELIMINAR_PERFIL_OPCION(
 p_id_perfil IN SD_PERFILES_OPCIONES.ID_PERFIL%TYPE,
 p_id_opc  IN SD_PERFILES_OPCIONES.ID_OPC%TYPE,
 p_id_usr   NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
 /*
 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN

  -- Validamos nulos
  IF p_id_perfil IS NULL OR p_id_opc IS NULL  THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Verificamos que la LISTA no exista 
    SELECT COUNT(*) INTO v_cnt FROM SD_PERFILES_OPCIONES  WHERE ID_PERFIL  = p_id_perfil AND ID_OPC =p_id_opc ;
    IF v_cnt = 0 THEN
      v_res := 'No existe Asociacion.';
    END IF;
  END IF;
  IF v_res='0' THEN
      -- Creamos la LISTA
      DELETE FROM SD_PERFILES_OPCIONES  WHERE ID_PERFIL  = p_id_perfil AND ID_OPC =p_id_opc ;

      COMMIT;
      
      v_res := '1';
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Menu Opciones','P_SG_ELIMINAR_PERFIL_OPCION','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ELIMINAR_SOCIO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ELIMINAR_SOCIO(
p_id_socio  SD_SOCIOS.ID_SOCIO%type,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_cantidad_hojas NUMBER:=0;
 v_cantidad_reg NUMBER:=0;
 v_cantidad_oblig NUMBER :=0;
 v_debe NUMBER :=0;
 v_total_hoja NUMBER :=0;
   
 v_cantidad_hojas_oblig NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
 v_fecha_hasta DATE;
 v_fecha DATE;
 v_id_socio number;
 v_id_auto  number ;
BEGIN
  v_res := '1';
  SELECT ID_SOCIO_MOVIL INTO v_id_socio FROM SD_SOCIO_MOVILES WHERE ID_SOCIO = p_id_socio ;
  select ID_AUTO INTO v_id_auto FROM SD_SOCIO_MOVIL_AUTOS  WHERE ID_SOCIO_MOVIL = v_id_socio ;
  DELETE FROM SD_SOCIO_MOVIL_AUTOS WHERE ID_SOCIO_MOVIL = v_id_socio ;
  DELETE FROM SD_AUTOS WHERE ID_AUTO = v_id_auto;
  DELETE FROM SD_SOC_MOV_OBLIG  WHERE ID_SOCIO_MOVIL = v_id_socio;
  DELETE FROM SD_SOCIO_MOVILES WHERE ID_SOCIO_MOVIL = v_id_socio;
  DELETE FROM SD_SOCIOS WHERE ID_SOCIO = p_id_socio;
  FOR x in (SELECT * from SD_HOJAS_CONTROL WHERE ID_SOCIO_MOVIL = v_id_socio ORDER BY FECHA_COMPRA DESC) LOOP
         DELETE FROM SD_DETALLES_HOJAS_CONTROL   WHERE ID_HOJA  = x.id_hoja;
         v_fecha := x.fecha_compra;
         DELETE FROM SD_HOJAS_CONTROL WHERE  ID_HOJA  = x.id_hoja;
  END LOOP;
  
  P_SD_ACT_KARDEX_EFECTIVO(14,v_fecha ,1 ,v_res);
 
commit ;
    
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_ACT_KARDEX_HOJA','P_SD_ACT_KARDEX_HOJA','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GRABAR_HIST_EDICION_DATOS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GRABAR_HIST_EDICION_DATOS(
 p_id_tabla  IN SD_HIST_EDICION_DATOS.ID_TABLA%TYPE,
 p_tabla  IN SD_HIST_EDICION_DATOS.TABLA%TYPE,
 p_campo  IN SD_HIST_EDICION_DATOS.CAMPO%TYPE,
 p_valor_actual  IN SD_HIST_EDICION_DATOS.VALOR_NUEVO%TYPE,
 p_valor_nuevo  IN SD_HIST_EDICION_DATOS.VALOR_NUEVO%TYPE,
 p_motivo  IN SD_HIST_EDICION_DATOS.MOTIVO%TYPE,
 p_login_usr  IN SD_HIST_EDICION_DATOS.LOGIN_USR%TYPE,
 p_res OUT  VARCHAR2
)
/*
 Finalidad: Procedimiento para grabar un registro de HIST_EDICION_DATOS
 Recibe:  p_id_tabla -> ID del registro que se acaba de Insertar y del cual se requiere guardar su historico.
-- Recibe:  p_id_tabla -> ID del registro que se Inserta / Modifica; Si el valor es mayor a 0 (y diferente de nulo), indica que es una modificacion
             p_tabla  ->  Nombre de la tabla para la que se genera historico
             p_campoID  -> Nombre del Campo ID de la tabla para la que se genera historico
             p_id_usr   -> ID del usuario que realiza la operacion
 Retorna: p_res ->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 30-JUL-13
 Autor: Henry Terceros
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0'; 
 v_sql VARCHAR2(2000);
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN
  -- Validamos nulos
  IF p_id_tabla IS NULL OR p_tabla IS NULL OR p_campo IS NULL OR p_login_usr IS NULL THEN
      v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Grabamos historico, siempre y cuando el valor nuevo no sea nulo y sea diferente del valor actual (el que esta en la BD)
    IF p_valor_nuevo IS NOT NULL AND (p_valor_actual IS NULL OR p_valor_actual <> p_valor_nuevo ) THEN
        v_sql := 'INSERT INTO SD_HIST_EDICION_DATOS(id_hist, id_tabla, tabla, campo, valor_nuevo, motivo, fecha_reg, login_usr)  ' ||
                     'VALUES(q_SD_hist_edicion_datos.nextval, ' || p_id_tabla || ', ''' || p_tabla || ''', ''' || p_campo || ''', ''' || substr(p_valor_nuevo,1,250) || ''', ''' || p_motivo || ''',SYSDATE ,''' || p_login_usr || ''') '; 
        EXECUTE IMMEDIATE v_sql;
--        COMMIT; -- El commit debera hacerse en el SP desde donde se lo llama !!!
        v_res := '1';
    END IF;
  END IF;
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'HIST_EDICION_DATOS','P_SD_GRABAR_HIST_EDICION_DATOS',v_sql,1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GRABAR_IMPRESION;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GRABAR_IMPRESION(
 p_nro_inicio       IN SD_IMPRESIONES.NRO_INICIO%TYPE,
 p_nro_fin IN SD_IMPRESIONES.NRO_FIN%TYPE,
 p_observacion IN SD_IMPRESIONES.OBSERVACION%TYPE,
 p_login_usr   VARCHAR,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
 v_id number := 0 ;
BEGIN

  -- Validamos nulos
  IF p_nro_inicio IS NULL OR p_nro_fin IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
      -- Creamos la LISTA
      v_id := Q_SD_IMPRESIONES.nextval;
      INSERT INTO SD_IMPRESIONES(ID_IMPRESION, NRO_INICIO ,NRO_FIN ,OBSERVACION ,FECHA_REG, LOGIN_USR )
      VALUES(v_id, p_nro_inicio, p_nro_fin, p_observacion, sysdate, p_login_usr);

      COMMIT;
      
      v_res := v_id;
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Alta Impresiones','P_SD_GRABAR_IMPRESION','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GRABAR_LISTAS_ITEMS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GRABAR_LISTAS_ITEMS(
 p_id_tabla  IN SD_LISTAS_ITEMS.ID_TABLA%TYPE,
 p_id_padre  IN SD_LISTAS_ITEMS.ID_PADRE%TYPE,
 p_id_lista  IN SD_LISTAS_ITEMS.ID_LISTA%TYPE,
 p_codigo  IN SD_LISTAS_ITEMS.CODIGO%TYPE,
 p_valor  IN SD_LISTAS_ITEMS.VALOR%TYPE,
 p_estado  IN SD_LISTAS_ITEMS.ESTADO%TYPE,
 p_login_usr   VARCHAR2,  -- Login del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
/*
 Finalidad: Procedimiento para grabar el alta o modificacion de LISTAS_ITEMS
 Recibe: p_id_tabla  -> ID del Item de Lista que se pretende modificar (Si es nuevo, sera 0)
         p_id_padre  -> ID del Item de Lista al que se pretende relacionar el item actual 
         p_id_lista  -> ID de la lista a la que esta asociada este Item
         p_codigo  -> Codigo del Item
         p_valor  -> Valor del Item
         p_estado  -> Estado (A->Activo o I->Inactivo)
         p_login_usr  -> Login del usr que realiza la operacion
 Retorna: p_res ->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 01-AUG-13
 Autor: [nombre] [apellido]
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0'; 
 v_sql VARCHAR2(2000);
 v_sql1 VARCHAR2(200);
 v_tipo_oper VARCHAR2(10);
 v_rg    SD_LISTAS_ITEMS%ROWTYPE;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
 v_id       NUMBER := 0;
BEGIN
  -- Validamos nulos
  IF p_id_tabla IS NOT NULL AND p_id_padre IS NOT NULL  THEN
    v_res := '0'; -- Quiere decir que es una creacion de relacion entre items de listas.
  ELSE
--    v_res := 'Faltan parametros.';
    IF p_id_lista IS NULL OR p_codigo IS NULL OR p_valor IS NULL OR p_estado IS NULL  THEN
      v_res := 'Faltan parametros.';
    END IF;
  END IF;
  -- Para el caso de ALTA, validamos que el registro NO exista
  IF v_res = '0' AND (p_id_tabla = 0 OR p_id_tabla IS NULL ) THEN
      SELECT COUNT (1) INTO v_cnt FROM SD_LISTAS_ITEMS WHERE id_lista = p_id_lista AND (codigo = p_codigo OR valor = p_valor);
      IF v_cnt > 0 THEN
         v_res := 'El elemento ' || p_codigo || '/' || p_valor || ' ya existe en la lista.';
      END IF;
  END IF;
  -- Para el caso de MODIFICACION, validamos que el registro exista
  IF v_res = '0' AND p_id_tabla > 0 THEN
      SELECT COUNT (1) INTO v_cnt FROM SD_LISTAS_ITEMS WHERE id_tabla = p_id_tabla;
      IF v_cnt = 0 THEN
         v_res := 'NO existe el elemento que pretende modificar.';
      ELSE
         SELECT * INTO v_rg FROM SD_LISTAS_ITEMS WHERE id_tabla = p_id_tabla;
      END IF;
  END IF;
  IF v_res='0' THEN
    -- Si se trata de una INSERCION ...
    IF p_id_tabla = 0 OR p_id_tabla IS NULL THEN
        -- Obtenemos el correlativo
        SELECT q_SD_LISTAS_ITEMS.nextval INTO v_id FROM dual;
        -- Creamos el registro
        v_sql:='INSERT INTO SD_LISTAS_ITEMS(id_tabla, id_padre, id_lista, codigo, valor, estado) ' ||
               'VALUES(' || v_id || ', ';
        IF p_id_padre IS NULL THEN
          v_sql:=v_sql || 'NULL, ';
        ELSE
          v_sql:=v_sql || '' || p_id_padre|| ', '; 
        END IF; 
        v_sql:=v_sql || '' || p_id_lista|| ', '; 
        IF p_codigo IS NULL THEN
          v_sql:=v_sql || 'NULL, ';
        ELSE
          v_sql:=v_sql || '''' || p_codigo|| ''', '; 
        END IF; 
        v_sql:=v_sql || '''' || p_valor|| ''', '; 
        v_sql:=v_sql || '''' || p_estado|| ''')'; 
        EXECUTE IMMEDIATE v_sql;
        v_tipo_oper := 'ALTA';
    ELSE
        -- Construimos la consulta de actualizacion
        v_sql := '';
        IF p_id_tabla IS NOT NULL AND (p_id_tabla <> v_rg.id_tabla OR v_rg.id_tabla IS NULL) THEN
            v_sql := v_sql || ' id_tabla=' || p_id_tabla || ',';
        END IF;
        IF p_id_padre <> v_rg.id_padre OR (p_id_padre IS NULL AND v_rg.id_padre IS NOT NULL) OR (p_id_padre IS NOT NULL AND v_rg.id_padre IS NULL) THEN
            v_sql := v_sql || ' id_padre=' || p_id_padre || ',';
        END IF;
        IF p_id_lista IS NOT NULL AND (p_id_lista <> v_rg.id_lista OR v_rg.id_lista IS NULL) THEN
            v_sql := v_sql || ' id_lista=' || p_id_lista || ',';
        END IF;
        IF p_codigo <> v_rg.codigo OR (p_codigo IS NULL AND v_rg.codigo IS NOT NULL) OR (p_codigo IS NOT NULL AND v_rg.codigo IS NULL) THEN
            v_sql := v_sql || ' codigo=''' || p_codigo || ''',';
        END IF;
        IF p_valor IS NOT NULL AND (p_valor <> v_rg.valor OR v_rg.valor IS NULL) THEN
            v_sql := v_sql || ' valor=''' || p_valor || ''',';
        END IF;
        IF p_estado IS NOT NULL AND (p_estado <> v_rg.estado OR v_rg.estado IS NULL) THEN
            v_sql := v_sql || ' estado=''' || p_estado || ''',';
        END IF;
        -- Comprobamos si existe algun dato a modificar. 
        IF v_sql = '' OR v_sql IS NULL THEN         -- Oracle trata actualemente a las cadenas vacias como NULL
            v_res := 'No existe ningun dato diferente a ser modificado.';
        END IF;
        IF v_res = '0' THEN
            v_sql := 'UPDATE SD_LISTAS_ITEMS SET ' || SUBSTR (v_sql, 1, LENGTH (v_sql) - 1) || ' WHERE id_tabla = ' || p_id_tabla;
            EXECUTE IMMEDIATE (v_sql);
            v_tipo_oper := 'EDICION';
        END IF;
    END IF;
    IF v_res = '0' THEN
        -- Grabamos historicos (un registro por cada campo no nulo)
        P_SD_GRABAR_HIST_EDICION_DATOS(v_id, 'SD_LISTAS_ITEMS', 'id_padre', v_rg.id_padre, p_id_padre, v_tipo_oper, p_login_usr, v_res);
        P_SD_GRABAR_HIST_EDICION_DATOS(v_id, 'SD_LISTAS_ITEMS', 'id_lista', v_rg.id_lista, p_id_lista, v_tipo_oper, p_login_usr, v_res);
        P_SD_GRABAR_HIST_EDICION_DATOS(v_id, 'SD_LISTAS_ITEMS', 'codigo', v_rg.codigo, p_codigo, v_tipo_oper, p_login_usr, v_res);
        P_SD_GRABAR_HIST_EDICION_DATOS(v_id, 'SD_LISTAS_ITEMS', 'valor', v_rg.valor, p_valor, v_tipo_oper, p_login_usr, v_res);
        P_SD_GRABAR_HIST_EDICION_DATOS(v_id, 'SD_LISTAS_ITEMS', 'estado', v_rg.estado, p_estado, v_tipo_oper, p_login_usr, v_res);

        COMMIT;
        v_res := '1';
    END IF;
  END IF;
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC, v_errD, 'ADM. LISTAS_ITEMS', 'P_SD_GRABAR_LISTAS_ITEMS', v_sql, p_login_usr, v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GRABAR_PERMISOS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GRABAR_PERMISOS(
 p_id_socio_movil       IN SD_PERMISOS.ID_SOCIO_MOVIL%TYPE,
 p_motivo IN SD_PERMISOS.MOTIVO%TYPE,
 p_observacion IN SD_PERMISOS.OBSERVACION%TYPE,
 p_cant_hojas_oblig IN SD_PERMISOS.CANT_HOJAS_OBLIG%TYPE,
 p_fecha_ini IN SD_PERMISOS.FECHA_INI%TYPE,
 p_fecha_fin IN SD_PERMISOS.FECHA_FIN%TYPE,
 p_login_usr   VARCHAR,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN

  -- Validamos nulos
  IF p_id_socio_movil IS NULL OR p_motivo IS NULL OR p_observacion IS NULL OR p_cant_hojas_oblig IS NULL OR p_fecha_ini IS NULL OR p_fecha_fin IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
      -- Creamos verificamos si existe algun permiso dentro del rango de fecha
      
      SELECT COUNT(*) INTO v_cnt FROM SD_PERMISOS WHERE ID_SOCIO_MOVIL = p_id_socio_movil AND ESTADO = 'ACTIVO' AND (( p_fecha_ini >= FECHA_INI AND p_fecha_ini <=FECHA_FIN ) OR (p_fecha_fin >= FECHA_INI AND p_fecha_fin <=FECHA_FIN));
      
      IF v_cnt  > 0 THEN
        
             v_res := 'Existe un permiso Asociado entre el intervalo de fechas Seleccionar Otro Intervalo de fecha';
      ELSE
      
            SELECT COUNT(*) INTO v_cnt FROM SD_PERMISOS WHERE ID_SOCIO_MOVIL = p_id_socio_movil AND ESTADO = 'ACTIVO'  AND ( FECHA_INI >= p_fecha_ini  AND FECHA_FIN <= p_fecha_fin )  ;
            
              IF v_cnt  > 0 THEN
        
                     v_res := 'Existe un permiso Asociado entre el intervalo de fechas Seleccionar Otro Intervalo de fecha';
              END IF;
      END IF;
      
      
      IF v_res='0'  THEN
        INSERT INTO SD_PERMISOS (ID_PERMISO ,ID_SOCIO_MOVIL, MOTIVO ,OBSERVACION ,CANT_HOJAS_OBLIG, FECHA_INI ,FECHA_FIN ,FECHA_REG ,LOGIN ,ESTADO   )
        VALUES (Q_SD_PERMISOS.nextval ,p_ID_SOCIO_MOVIL, p_MOTIVO ,p_OBSERVACION ,p_CANT_HOJAS_OBLIG, TO_DATE(TO_CHAR(p_fecha_ini,'MM/YYYY'),'MM/YYYY') ,TRUNC(LAST_DAY(p_fecha_fin)) ,sysdate ,p_login_usr ,'ACTIVO'   );
         P_SD_ACT_KARDEX_HOJA(p_ID_SOCIO_MOVIL,TO_DATE(TO_CHAR(p_fecha_ini,'MM/YYYY'),'MM/YYYY')  ,p_login_usr,v_res);
      END IF;
      
      COMMIT;
      
      v_res := '1';
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Alta P_SD_GRABAR_PERMISOS','P_SD_GRABAR_PERMISOS','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GRABAR_SOCIO_MOVILES;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GRABAR_SOCIO_MOVILES(
 p_id_socio_movil  IN SD_SOCIO_MOVILES.ID_SOCIO_MOVIL%TYPE,
 p_id_socio  IN SD_SOCIO_MOVILES.ID_SOCIO%TYPE,
 p_id_movil  IN SD_SOCIO_MOVILES.ID_MOVIL%TYPE,
 p_descripcion  IN SD_SOCIO_MOVILES.DESCRIPCION%TYPE,
 p_tipo_movil  IN SD_SOCIO_MOVILES.TIPO_MOVIL%TYPE,
 p_fecha_alta  IN SD_SOCIO_MOVILES.FECHA_ALTA%TYPE,
 p_fecha_baja  IN SD_SOCIO_MOVILES.FECHA_BAJA%TYPE,
 p_observacion  IN SD_SOCIO_MOVILES.OBSERVACION%TYPE,
 p_id_usr  IN SD_SOCIO_MOVILES.ID_USR%TYPE,
 p_estado  IN SD_SOCIO_MOVILES.ESTADO%TYPE,
 p_res OUT  VARCHAR2
)
/*
 Finalidad: Procedimiento para grabar el alta o modificacion de SOCIO_MOVILES
 Recibe:  __ , __ , etc -> Parametros 
         p_id_socio_movil  -> 
         p_id_socio  -> 
         p_id_movil  -> 
         p_descripcion  -> 
         p_tipo_movil  -> 
         p_fecha_alta  -> 
         p_fecha_baja  -> 
         p_observacion  -> 
         p_fecha_reg  -> 
         p_id_usr  -> 
         p_estado  -> 
 Retorna: p_res ->Mensaje de OK ("1") o Descripcion del error
 Fecha Creacion: 08-JUL-14
 Autor: [nombre] [apellido]
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0'; 
 v_sql VARCHAR2(2000);
 v_sql1 VARCHAR2(200);
 v_tipo_oper VARCHAR2(10);
 v_rg    SD_SOCIO_MOVILES%ROWTYPE;
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
 v_id       NUMBER := 0;
BEGIN
  -- Validamos nulos
  IF p_id_socio_movil IS NULL OR p_id_socio IS NULL OR p_id_movil IS NULL OR p_fecha_alta IS NULL   OR p_tipo_movil IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
   IF p_id_socio_movil = 0 THEN
      
        v_id := Q_SD_SOCIO_MOVILES.nextval;
         INSERT INTO SINDICATO_121_2020.SD_SOCIO_MOVILES (id_socio_movil ,id_socio ,id_movil ,descripcion ,tipo_movil ,fecha_alta ,fecha_baja ,observacion ,fecha_reg ,id_usr ,estado )
        VALUES(v_id ,p_id_socio ,p_id_movil ,p_descripcion ,p_tipo_movil ,p_fecha_alta ,null ,p_observacion ,sysdate ,p_id_usr ,'ACTIVO');
        v_res :=  v_id;
        commit;
   ELSE
      UPDATE SD_SOCIO_MOVILES SET DESCRIPCION  = p_descripcion  , OBSERVACION  = p_observacion , 
      TIPO_MOVIL  = p_tipo_movil  , FECHA_ALTA  = p_fecha_alta    WHERE ID_SOCIO_MOVIL  = p_id_socio_movil ;
          v_res :=  p_id_socio_movil;
            commit;
   END IF;
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC, v_errD, 'ADM. SOCIO_MOVILES', 'P_MN_GRABAR_SOCIO_MOVILES', v_sql, p_id_usr, v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_CAJAS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_CAJAS(
p_id_caja SD_CAJAS.ID_CAJA%type,
p_codigo SD_CAJAS.CODIGO%type,
p_nombre  SD_CAJAS.NOMBRE  %type,
p_nro_cuenta SD_CAJAS.NRO_CUENTA%type,
p_descripcion SD_CAJAS.DESCRIPCION%type,
p_saldo SD_CAJAS.SALDO%type,
p_moneda SD_CAJAS.MONEDA%type,
p_login   VARCHAR2,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_fecha SD_KARDEX_EFECTIVO.FECHA%type; 
 v_id_caja  SD_CAJAS.ID_CAJA%type;
 v_nro  SD_CAJAS.CODIGO %type;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_id_caja IS NULL OR p_nombre IS NULL OR p_nro_cuenta  IS NULL OR p_descripcion IS NULL
OR p_saldo IS NULL OR  p_login IS NULL  OR p_codigo IS NULL  
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_caja = 0 THEN
         --creacion
         select TO_DATE(TO_CHAR(sysdate, 'MM/DD/YYYY') , 'MM/DD/YYYY')  into v_fecha from dual;
        v_id_caja := Q_SD_CAJAS.nextval;
       
        INSERT INTO SD_CAJAS (ID_CAJA ,CODIGO ,NOMBRE ,NRO_CUENTA ,DESCRIPCION, SALDO, LOGIN ,FECHA_REG ,MONEDA   ) 
         VALUES  (v_id_caja,p_codigo , p_nombre, p_nro_cuenta ,p_descripcion ,p_saldo ,p_login, v_fecha ,p_moneda );
        
        v_res := '0';
         IF v_res = '0' THEN
             
            INSERT INTO SD_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, LOGIN ,FECHA_REG )
             VALUES (Q_SD_KARDEX_EFECTIVO.nextval , v_id_caja , v_id_caja , 'CAJA' ,v_fecha ,'CREACION CUENTA:'||p_nombre,p_saldo,0,0,p_login,sysdate );
          
        END IF;
    ELSE
       SELECT COUNT(*) INTO v_cnt FROM SD_KARDEX_EFECTIVO 
       WHERE ID_CAJA = p_id_caja AND ID_OPERACION <> p_id_caja AND OPERACION <> 'CAJA' ;
      IF v_cnt > 0 THEN
        v_res := 'Existen transacciones asociadas a esta caja.';
      ELSE
         select TO_DATE(TO_CHAR(sysdate, 'MM/DD/YYYY') , 'MM/DD/YYYY')  into v_fecha from dual;
        DELETE FROM SD_KARDEX_EFECTIVO WHERE ID_CAJA = p_id_caja AND ID_OPERACION = p_id_caja AND OPERACION = 'CAJA';
        UPDATE SD_CAJAS SET CODIGO = p_CODIGO ,NOMBRE =p_NOMBRE , NRO_CUENTA = p_NRO_CUENTA , DESCRIPCION = p_DESCRIPCION ,SALDO = p_SALDO  , MONEDA = p_moneda 
        WHERE ID_CAJA  =  p_ID_CAJA; 
         INSERT INTO SD_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, LOGIN ,FECHA_REG )
         VALUES (Q_SD_KARDEX_EFECTIVO.nextval , p_ID_CAJA , p_ID_CAJA , 'CAJA' ,v_fecha ,'CREACION CUENTA:'||p_nombre,p_saldo,0,0,p_login,sysdate );
         v_id_caja := p_id_caja;
      END IF;
        --editar
    END IF;
END IF;
    if v_res = '0' THEN
        v_res := '1';
     COMMIT;
      P_SD_ACT_KARDEX_EFECTIVO(v_id_caja, v_fecha ,1,v_res);

    ELSE
        ROLLBACK;
        
    END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Efectivo','P_SG_GUARDAR_CAJAS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_DEUDAS_SOCIOS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_DEUDAS_SOCIOS(
p_id_deuda SINDICATO_121_2020.SD_DEUDAS_SOCIOS.ID_DEUDA%type, 
p_id_caja SINDICATO_121_2020.SD_DEUDAS_SOCIOS.ID_CAJA%type,
p_motivo SINDICATO_121_2020.SD_DEUDAS_SOCIOS.MOTIVO%type,
p_fecha SINDICATO_121_2020.SD_DEUDAS_SOCIOS.FECHA%type,
p_observacion SINDICATO_121_2020.SD_DEUDAS_SOCIOS.OBSERVACION%type,
p_importe SINDICATO_121_2020.SD_DEUDAS_SOCIOS.IMPORTE%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_id NUMBER := 0;
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
BEGIN
IF p_id_deuda  IS NULL OR p_id_caja IS NULL OR p_motivo IS NULL OR p_importe IS NULL  OR p_fecha IS NULL
THEN
v_res := 'Faltan parametros.';
END IF;
IF p_id_deuda =  0 THEN
     
    IF v_res='0' THEN
        v_id := Q_SD_DEUDAS_SOCIOS.nextval;
        INSERT INTO SINDICATO_121_2020.SD_DEUDAS_SOCIOS   (ID_DEUDA , ID_CAJA ,MOTIVO , OBSERVACION ,ESTADO, IMPORTE, FECHA , FECHA_REG, LOGIN_USR   )
        VALUES( v_id, p_id_caja , p_motivo ,p_observacion ,'ACTIVO',  p_importe ,p_fecha,  sysdate , p_usr  );
         v_res := v_id;
    END IF;
ELSE
   
        SELECT COUNT(1) INTO v_cnt FROM SD_DETALLES_DEUDAS  WHERE ID_DEUDA = p_id_deuda AND IMPORTE_CANCELADO > 0;
        IF v_cnt > 0 THEN
           v_res := 'NO PUEDE EDITAR YA QUE EXISTEN PAGOS. FAVOR ELIMINAR LOS PAGOS PARA CONTINUAR';
        END IF;
        IF v_res='0' THEN
          UPDATE SD_DEUDAS_SOCIOS SET
          ID_CAJA =  p_id_caja ,  MOTIVO  = p_motivo ,OBSERVACION = p_observacion ,   IMPORTE = p_importe ,  LOGIN_USR  = p_usr  , FECHA = p_fecha
          WHERE ID_DEUDA   = p_id_deuda;
           
           v_res := v_id;
    END IF;

END IF; 

p_res := v_res;
COMMIT;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_GUARDAR_DEUDAS_SOCIOS','P_SD_GUARDAR_DEUDAS_SOCIOS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_FE;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_FE(
p_id_chofe SD_KARDEX_FM.ID_CHOFER%type,
p_id_kardex SD_KARDEX_FM.ID_KARDEX%type,
p_nro_cmp SD_KARDEX_FM.NRO_CMP%type,
p_operacion SD_KARDEX_FM.OPERACION%type,
p_fecha  SD_KARDEX_FM.FECHA%type,
p_ingreso SD_KARDEX_FM.INGRESO%type,
p_egreso SD_KARDEX_FM.EGRESO%type,
p_login   VARCHAR2,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_fondo VARCHAR2(1000):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
 v_id_kardex NUMBER :=0;
  v_fondo_emergencia NUMBER :=0;
  v_kardex_ingreso NUMBER :=0; 
  v_kardex_egreso NUMBER :=0; 
 v_fecha DATE;
BEGIN

IF p_id_chofe IS NULL OR p_operacion IS NULL OR p_fecha  IS NULL OR p_nro_cmp IS NULL
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_kardex = 0 THEN
         --creacion
        v_id_kardex := Q_SD_KARDEX_FM.nextval;
      P_REC_PARAMETROS('FONDO_EMERGENCIA',1,v_fondo);
        select FONDO_EMERGENCIA  INTO v_fondo_emergencia FROM SD_CHOFERES WHERE ID_CHOFER = p_id_chofe;
      IF v_fondo_emergencia + p_ingreso - p_egreso > v_fondo THEN
      
            v_res :='No puede Ingresar mas de lo Normal '; 
      END IF;
        IF v_res='0' THEN
            INSERT INTO SD_KARDEX_FM (ID_KARDEX, ID_CHOFER ,OPERACION ,FECHA ,INGRESO ,EGRESO  ,SALDO ,LOGIN ,FECHA_REG ,NRO_CMP ) 
            VALUES  (v_id_kardex,p_id_chofe , p_operacion, p_fecha    ,p_ingreso ,p_egreso ,0,p_login, sysdate,p_nro_cmp );
             P_SD_ACT_KARDEX_FM(p_id_chofe, p_fecha ,1,v_res);
            v_res := v_id_kardex;
        END IF;
       
    ELSE
          P_REC_PARAMETROS('FONDO_EMERGENCIA',1,v_fondo);
           select FONDO_EMERGENCIA  INTO v_fondo_emergencia FROM SD_CHOFERES WHERE ID_CHOFER = p_id_chofe;
           select INGRESO , EGRESO INTO v_kardex_ingreso , v_kardex_egreso FROM SD_KARDEX_FM WHERE ID_KARDEX = p_id_kardex;
           v_fondo_emergencia := v_fondo_emergencia -p_ingreso + p_egreso;
          IF v_fondo_emergencia + p_ingreso - p_egreso > v_fondo THEN
          
                v_res :='No puede Ingresar mas de lo Normal '; 
          END IF;
        IF v_res='0' THEN
        
               SELECT FECHA into v_fecha FROM SD_KARDEX_FM WHERE ID_KARDEX = p_id_kardex;
               DELETE FROM SD_KARDEX_FM WHERE ID_KARDEX = p_id_kardex;
               COMMIT;
                P_SD_ACT_KARDEX_FM(p_id_chofe,v_fecha  ,1,v_res);
                INSERT INTO SD_KARDEX_FM (ID_KARDEX, ID_CHOFER ,OPERACION ,FECHA ,INGRESO ,EGRESO  ,SALDO ,LOGIN ,FECHA_REG ,NRO_CMP ) 
                VALUES  (p_id_kardex,p_id_chofe , p_operacion, p_fecha    ,p_ingreso ,p_egreso ,0,p_login, sysdate,p_nro_cmp );
                 P_SD_ACT_KARDEX_FM(p_id_chofe,p_fecha  ,1,v_res);
             v_res := p_id_kardex;
       END If;
    END IF;
END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Fondo Emergencia','P_SD_GUARDAR_FONDO_EMER','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_FONDO_EMER;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_FONDO_EMER(
p_id_chofe SD_KARDEX_FM.ID_CHOFER%type,
p_id_kardex SD_KARDEX_FM.ID_KARDEX%type,
p_nro_cmp SD_KARDEX_FM.NRO_CMP%type,
p_operacion SD_KARDEX_FM.OPERACION%type,
p_fecha  SD_KARDEX_FM.FECHA%type,
p_ingreso SD_KARDEX_FM.INGRESO%type,
p_egreso SD_KARDEX_FM.EGRESO%type,
p_observacion SD_KARDEX_FM.OBSERVACION%type,
p_login   VARCHAR2,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_fondo VARCHAR2(1000):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
 v_id_kardex NUMBER :=0;
 v_id_caja NUMBER := 0;
  v_fondo_emergencia NUMBER :=0;
  v_kardex_ingreso NUMBER :=0; 
  v_kardex_egreso NUMBER :=0; 
 v_fecha DATE;
BEGIN

IF p_id_chofe IS NULL OR p_operacion IS NULL OR p_fecha  IS NULL OR p_nro_cmp IS NULL
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_kardex = 0 THEN
         --creacion
        v_id_kardex := Q_SD_KARDEX_FM.nextval;
      P_REC_PARAMETROS('FONDO_EMERGENCIA',1,v_fondo);
      P_REC_PARAMETROS('CAJA_FONDO_EMERGENCIA',1,v_id_caja);
        select FONDO_EMERGENCIA  INTO v_fondo_emergencia FROM SD_CHOFERES WHERE ID_CHOFER = p_id_chofe;
      IF v_fondo_emergencia + p_ingreso  > v_fondo OR v_fondo_emergencia - p_egreso < 0  THEN
      
            v_res :='No puede Ingresar mas de lo Normal '; 
      END IF;
        IF v_res='0' THEN
            INSERT INTO SD_KARDEX_FM (ID_KARDEX, ID_CHOFER ,OPERACION ,FECHA ,INGRESO ,EGRESO  ,SALDO ,LOGIN ,FECHA_REG ,NRO_CMP,OBSERVACION  ) 
            VALUES  (v_id_kardex,p_id_chofe , p_operacion, p_fecha    ,p_ingreso ,p_egreso ,0,p_login, sysdate,p_nro_cmp ,p_observacion );
             P_SD_ACT_KARDEX_FM(p_id_chofe, p_fecha ,1,v_res);
             
              
            INSERT INTO SD_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, LOGIN ,FECHA_REG )
            VALUES (Q_SD_KARDEX_EFECTIVO.nextval , v_id_caja , v_id_kardex , 'FONDO EMERGENCIA' ,p_fecha ,'FONDO EMERGENCIA :'||p_operacion||' CHOFER :'||p_id_chofe,p_ingreso,p_egreso,0,p_login,sysdate );
              P_SD_ACT_KARDEX_EFECTIVO(v_id_caja, p_fecha ,1,v_res);
            v_res := v_id_kardex;
        END IF;
       
    ELSE
          P_REC_PARAMETROS('FONDO_EMERGENCIA',1,v_fondo);
          P_REC_PARAMETROS('CAJA_FONDO_EMERGENCIA',1,v_id_caja);
           select FONDO_EMERGENCIA  INTO v_fondo_emergencia FROM SD_CHOFERES WHERE ID_CHOFER = p_id_chofe;
           select INGRESO , EGRESO INTO v_kardex_ingreso , v_kardex_egreso FROM SD_KARDEX_FM WHERE ID_KARDEX = p_id_kardex;
           v_fondo_emergencia := v_fondo_emergencia -p_ingreso + p_egreso;
          IF v_fondo_emergencia + p_ingreso  > v_fondo OR v_fondo_emergencia - p_egreso < 0 THEN
          
                v_res :='No puede Ingresar mas de lo Normal '; 
          END IF;
        IF v_res='0' THEN
        
                    SELECT FECHA into v_fecha FROM SD_KARDEX_FM WHERE ID_KARDEX = p_id_kardex;
                    DELETE FROM SD_KARDEX_FM WHERE ID_KARDEX = p_id_kardex;
                    DELETE FROM SD_KARDEX_EFECTIVO  WHERE ID_OPERACION  = p_id_kardex AND OPERACION ='FONDO EMERGENCIA';
                    COMMIT;
                    P_SD_ACT_KARDEX_FM(p_id_chofe,v_fecha  ,1,v_res);
                    P_SD_ACT_KARDEX_EFECTIVO(v_id_caja, p_fecha ,1,v_res);
                    INSERT INTO SD_KARDEX_FM (ID_KARDEX, ID_CHOFER ,OPERACION ,FECHA ,INGRESO ,EGRESO  ,SALDO ,LOGIN ,FECHA_REG ,NRO_CMP,OBSERVACION ) 
                    VALUES  (p_id_kardex,p_id_chofe , p_operacion, p_fecha    ,p_ingreso ,p_egreso ,0,p_login, sysdate,p_nro_cmp,p_observacion );
                    P_SD_ACT_KARDEX_FM(p_id_chofe,p_fecha  ,1,v_res);
                    
                    INSERT INTO SD_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, LOGIN ,FECHA_REG )
                    VALUES (Q_SD_KARDEX_EFECTIVO.nextval , v_id_caja , p_id_kardex , 'FONDO EMERGENCIA' ,p_fecha ,'FONDO EMERGENCIA :'||p_operacion||' CHOFER :'||p_id_chofe,p_ingreso,p_egreso,0,p_login,sysdate );
                    P_SD_ACT_KARDEX_EFECTIVO(v_id_caja, p_fecha ,1,v_res);
                    v_res := p_id_kardex;
       END If;
    END IF;
END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Fondo Emergencia','P_SD_GUARDAR_FONDO_EMER','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_HOJA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_HOJA(
p_ID_SOCIO_MOVIL  SINDICATO_121_2020.SD_HOJAS_CONTROL.ID_SOCIO_MOVIL%type,
p_id_parada SINDICATO_121_2020.SD_HOJAS_CONTROL.Id_PARADA%type,
p_id_chofer SINDICATO_121_2020.SD_HOJAS_CONTROL.ID_CHOFER%type,
p_fecha_compra SINDICATO_121_2020.SD_HOJAS_CONTROL.FECHA_COMPRA %type,
p_cantidad number,
p_hojas VARCHAR2,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_cnt_numero NUMBER:=0;
v_numero NUMBER :=0;
v_monto NUMBER := 0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id_hoja  NUMBER := 0;
v_id_venta  NUMBER := 0;
v_nro_movil  NUMBER := 0;
BEGIN
IF p_ID_SOCIO_MOVIL  IS NULL OR p_id_parada IS NULL OR p_fecha_compra IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN
        v_id_venta := Q_SD_VENTA_HOJAS .nextval;

        SELECT COUNT(*) INTO v_cnt_numero FROM SD_HOJAS_CONTROL WHERE ID_SOCIO_MOVIL = p_ID_SOCIO_MOVIL AND TO_CHAR(FECHA_COMPRA,'MM/YYYY' ) = TO_CHAR(p_fecha_compra,'MM/YYYY') AND ESTADO <> 'ANULADO';
        IF v_cnt_numero > 0 THEN
            SELECT MAX(NRO_HOJA )  + 1 INTO v_numero FROM SD_HOJAS_CONTROL WHERE ID_SOCIO_MOVIL = p_ID_SOCIO_MOVIL AND TO_CHAR(FECHA_COMPRA,'MM/YYYY' ) = TO_CHAR(p_fecha_compra,'MM/YYYY') AND ESTADO <> 'ANULADO';
        
        ELSE 
            v_numero := 1;
        
        END IF;

        WHILE v_cnt < p_cantidad LOOP
            v_id_hoja := Q_SD_HOJAS_CONTROL.nextval;
            select SUM(IMPORTE ) INTO v_monto from SD_SOC_MOV_OBLIG  WHERE ID_SOCIO_MOVIL = p_ID_SOCIO_MOVIL;
            
            SELECT NRO_MOVIL INTO v_nro_movil  FROM SD_MOVILES mov , SD_SOCIO_MOVILES som WHERE MOV.ID_MOVIL = SOM.ID_MOVIL AND SOM.ESTADO = 'ACTIVO' AND SOM.ID_SOCIO_MOVIL = p_ID_SOCIO_MOVIL ;
             INSERT INTO SD_HOJAS_CONTROL (ID_HOJA ,ID_PARADA, ID_SOCIO_MOVIL ,ID_CHOFER, NRO_HOJA, FECHA_COMPRA, MONTO, FECHA_USO, OBSERVACION, ESTADO, LOGIN ,FECHA_REG )
             VALUES  ( v_id_hoja,p_ID_PARADA,p_ID_SOCIO_MOVIL ,p_ID_CHOFER, v_numero, p_FECHA_COMPRA, v_monto, p_FECHA_COMPRA, 'COMPRA', 'NUEVO', p_usr ,sysdate );  
            
            INSERT INTO SD_DETALLES_HOJAS_CONTROL (ID_DETALLE ,ID_HOJA, ID_CAJA, OBLIGACION, IMPORTE ,LOGIN ,FECHA_REG )
            (
            SELECT Q_SD_DETALLES_HOJAS_CONTROL.nextval , v_id_hoja ,OB.ID_CAJA ,OB.OBLIGACION,SOC.IMPORTE , p_usr , sysdate  from SD_SOC_MOV_OBLIG soc , SD_OBLIGACIONES_HOJA  ob where SOC.ID_OBLIGACION =  OB.ID_OBLIGACION AND id_socio_movil = p_ID_SOCIO_MOVIL
            );
            INSERT INTO SD_KARDEX_EFECTIVO (ID_KARDEX ,ID_CAJA ,ID_OPERACION ,OPERACION ,FECHA, DETALLE ,INGRESO ,EGRESO, SALDO, LOGIN, FECHA_REG )
            (
               SELECT Q_SD_KARDEX_EFECTIVO.nextval , ob.id_caja ,  v_id_hoja , 'VENTA HOJA',p_fecha_compra , ob.obligacion||' - Movil : '||v_nro_movil ,SOC.IMPORTE , 0 , 0 , p_usr , sysdate  from SD_SOC_MOV_OBLIG soc , SD_OBLIGACIONES_HOJA  ob where SOC.ID_OBLIGACION =  OB.ID_OBLIGACION AND id_socio_movil = p_ID_SOCIO_MOVIL
            );
            v_cnt := v_cnt + 1;
            v_numero := v_numero + 1;
            INSERT INTO SD_VENTA_HOJAS VALUES(v_id_venta , v_id_hoja , sysdate,Q_SD_VENTA_HOJAS .nextval);
            
        END LOOP;
      
        
         COMMIT;
         
         FOR x IN (select id_caja from SD_OBLIGACIONES_HOJA group by id_caja ) LOOP
            P_SD_ACT_KARDEX_EFECTIVO(x.id_caja,p_fecha_compra ,1 ,v_res);
            
         END LOOP;
         
         IF p_hojas = 'MES' THEN
         
                FOR x IN (WITH d AS
                (SELECT TRUNC ( p_fecha_compra, 'MM' ) - 1 AS dt
                FROM dual
                )
                SELECT dt + LEVEL as DIA
                FROM d 
                CONNECT BY LEVEL <= ADD_MONTHS (dt, 1) - dt ) LOOP
                INSERT INTO SD_DETALLES_HOJAS_USO  VALUES( Q_SD_DETALLES_HOJAS_USO.nextval , v_id_hoja ,x.DIA , 'NUEVO',sysdate,null);
                              
                END LOOP;
                
        ELSE 
                INSERT INTO SD_DETALLES_HOJAS_USO  VALUES( Q_SD_DETALLES_HOJAS_USO.nextval , v_id_hoja ,p_fecha_compra , 'NUEVO',sysdate,null);
        END IF;
     COMMIT;
         P_SD_ACT_KARDEX_HOJA(p_ID_SOCIO_MOVIL,p_fecha_compra ,p_usr,v_res);
         v_res := v_id_venta;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_GUARDAR_HOJA','P_SD_GUARDAR_HOJA','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_MORA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_MORA(
p_ID_MORA  SINDICATO_121_2020.SD_PRESTAMOS_MORA .ID_MORA  %type,
p_ID_PRESTAMO SINDICATO_121_2020.SD_PRESTAMOS_MORA .ID_PRESTAMO %type,
p_importe_mora SINDICATO_121_2020.SD_PRESTAMOS_MORA.IMPORTE_MORA %type,
p_fecha_limite_pago_mora SINDICATO_121_2020.SD_PRESTAMOS_MORA.FECHA_LIMITE_PAGO_MORA  %type,
p_observacion SINDICATO_121_2020.SD_PRESTAMOS_MORA.OBSERVACION   %type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_cnt_numero NUMBER:=0;
v_numero NUMBER :=0;
v_monto NUMBER := 0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id  NUMBER := 0;
v_id_venta  NUMBER := 0;
v_nro_movil  NUMBER := 0;
BEGIN
IF p_ID_MORA IS NULL OR p_ID_PRESTAMO IS NULL OR p_importe_mora  IS NULL OR p_fecha_limite_pago_mora IS NULL  
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_ID_MORA = 0 THEN
         --creacion
        v_id := Q_SD_PRESTAMOS_MORA.nextval;
       
        INSERT INTO SD_PRESTAMOS_MORA  (ID_MORA  ,ID_PRESTAMO  ,FECHA  ,IMPORTE_MORA  ,OBSERVACION , FECHA_LIMITE_PAGO_MORA  ,FECHA_REG ,LOGIN_USR    ) 
         VALUES  (v_id,p_ID_PRESTAMO , sysdate, p_importe_mora,p_observacion ,p_fecha_limite_pago_mora , sysdate , p_usr );
        
    ELSE
       
        UPDATE SD_PRESTAMOS_MORA SET IMPORTE_MORA  = p_importe_mora ,OBSERVACION  =p_observacion , FECHA_LIMITE_PAGO_MORA  = p_fecha_limite_pago_mora 
        WHERE ID_MORA   =  p_ID_MORA; 
         v_id := p_ID_MORA;
      
    END IF;
END IF;
    if v_res = '0' THEN
        v_res := v_id;
     COMMIT;
    ELSE
        ROLLBACK;
        
    END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Prestamos','P_SD_GUARDAR_MORA','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_PERFIL;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_PERFIL(
 p_id_perfil IN SD_PERFILES.ID_PERFIL%TYPE,
 p_nombre  IN SD_PERFILES.NOMBRE%TYPE,
 p_descripcion  IN SD_PERFILES.DESCRIPCION%TYPE,
 p_id_usr   NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN

  -- Validamos nulos
  IF p_id_perfil IS NULL OR p_nombre IS NULL  THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Verificamos que la LISTA no exista 
    SELECT COUNT(*) INTO v_cnt FROM SD_PERFILES   WHERE NOMBRE   = p_nombre  ;
    IF v_cnt > 0 THEN
      v_res := 'Ya existe ese perfil .';
    END IF;
  END IF;
  IF v_res='0' THEN
      -- Creamos la LISTA
      INSERT INTO SD_PERFILES  (ID_PERFIL  ,NOMBRE  ,DESCRIPCION  ,ESTADO )
      VALUES(Q_SD_PERFILES.nextval, p_nombre, p_descripcion,  'A');

      COMMIT;
      
      v_res := '1';
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Menu Opciones','P_SG_GUARDAR_PERFIL','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_REGULACION;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_REGULACION(
p_ID_SOCIO_MOVIL  SINDICATO_121_2020.SD_REGULARIZACIONES.ID_SOCIO_MOVIL%type,
p_id_parada SINDICATO_121_2020.SD_REGULARIZACIONES.Id_PARADA%type,
p_fecha_compra SINDICATO_121_2020.SD_REGULARIZACIONES.FECHA_COMPRA%type,
p_mes  VARCHAR2,
p_cantidad number,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_cnt_numero NUMBER:=0;
v_numero NUMBER :=0;
v_monto NUMBER := 0;
v_res VARCHAR2(100):='0';
v_fecha DATE;
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id_hoja  NUMBER := 0;
v_id_venta  NUMBER := 0;
v_nro_movil  NUMBER := 0;
BEGIN
IF p_ID_SOCIO_MOVIL  IS NULL OR p_id_parada IS NULL OR p_mes IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN
      
      

            v_id_hoja := Q_SD_REGULARIZACIONES.nextval;
            select SUM(IMPORTE ) INTO v_monto from SD_SOC_MOV_OBLIG  WHERE ID_SOCIO_MOVIL = p_ID_SOCIO_MOVIL;
            
            SELECT NRO_MOVIL INTO v_nro_movil  FROM SD_MOVILES mov , SD_SOCIO_MOVILES som WHERE MOV.ID_MOVIL = SOM.ID_MOVIL AND SOM.ESTADO = 'ACTIVO' AND SOM.ID_SOCIO_MOVIL = p_ID_SOCIO_MOVIL ;
             INSERT INTO SD_REGULARIZACIONES ( ID_REGULACION,ID_PARADA ,ID_SOCIO_MOVIL ,MES ,MONTO ,CANTIDAD ,OBSERVACION ,ESTADO ,LOGIN ,FECHA_REG ,fecha_compra )
             VALUES (v_id_hoja ,p_ID_PARADA,p_ID_SOCIO_MOVIL , to_date(p_mes , 'MM-YYYY'),v_monto * p_cantidad , p_cantidad, 'REGULACION DE HOJAS', 'NUEVO' , p_usr , sysdate , p_fecha_compra );
             
             INSERT INTO SD_DETALLES_REGULARIZACIONES  (ID_DETALLE ,ID_REGULACION , ID_CAJA, OBLIGACION, IMPORTE ,LOGIN ,FECHA_REG )
            (
            SELECT Q_SD_DETALLES_REGULARIZACIONES.nextval , v_id_hoja ,OB.ID_CAJA_REG ,OB.OBLIGACION,SOC.IMPORTE * p_cantidad, p_usr , sysdate  from SD_SOC_MOV_OBLIG soc , SD_OBLIGACIONES_HOJA  ob where SOC.ID_OBLIGACION =  OB.ID_OBLIGACION AND id_socio_movil = p_ID_SOCIO_MOVIL
            );
            INSERT INTO SD_KARDEX_EFECTIVO (ID_KARDEX ,ID_CAJA ,ID_OPERACION ,OPERACION ,FECHA, DETALLE ,INGRESO ,EGRESO, SALDO, LOGIN, FECHA_REG )
            (
               SELECT Q_SD_KARDEX_EFECTIVO.nextval , ob.ID_CAJA_REG ,  v_id_hoja , 'REGULACION', p_fecha_compra, '(REGULARIZACION)'|| ob.obligacion||' - Movil : '||v_nro_movil ,SOC.IMPORTE * p_cantidad, 0 , 0 , p_usr , sysdate  from SD_SOC_MOV_OBLIG soc , SD_OBLIGACIONES_HOJA  ob where SOC.ID_OBLIGACION =  OB.ID_OBLIGACION AND id_socio_movil = p_ID_SOCIO_MOVIL
            );
            
     
      
        
         COMMIT;
         P_SD_ACT_KARDEX_HOJA(p_ID_SOCIO_MOVIL, to_date(p_mes , 'MM-YYYY') ,p_usr,v_res);
         
         FOR x IN (select ID_CAJA_REG from SD_OBLIGACIONES_HOJA group by ID_CAJA_REG ) LOOP
            P_SD_ACT_KARDEX_EFECTIVO(x.ID_CAJA_REG, p_fecha_compra,1 ,v_res);
            
         END LOOP;
         v_res := v_id_hoja;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_GUARDAR_REGULACION','P_SD_GUARDAR_REGULACION','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_TIPO_EGRESO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_TIPO_EGRESO(
p_id_tipo SINDICATO_121_2020.SD_TIPOS_EGRESOS .ID_TIPO%type, 
p_id_caja SINDICATO_121_2020.SD_TIPOS_EGRESOS.ID_CAJA%type,
p_nombre SINDICATO_121_2020.SD_TIPOS_EGRESOS.NOMBRE%type,
p_observacion SINDICATO_121_2020.SD_TIPOS_EGRESOS.OBSERVACION%type,
p_moneda SINDICATO_121_2020.SD_TIPOS_EGRESOS.MONEDA%type,
p_importe SINDICATO_121_2020.SD_TIPOS_EGRESOS.IMPORTE%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_id NUMBER := 0;
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
BEGIN
IF p_id_tipo  IS NULL OR p_id_caja IS NULL OR p_nombre IS NULL OR p_moneda IS NULL OR p_importe IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF p_id_tipo =  0 THEN
     
    IF v_res='0' THEN
        v_id := Q_SD_TIPOS_EGRESOS.nextval;
        INSERT INTO SINDICATO_121_2020.SD_TIPOS_EGRESOS   (ID_TIPO, ID_CAJA ,NOMBRE, OBSERVACION ,ESTADO, MONEDA ,IMPORTE, FECHA_REG, LOGIN_USR   )
        VALUES( v_id, p_id_caja , p_nombre ,p_observacion ,'ACTIVO', p_moneda, p_importe , sysdate , p_usr  );
         v_res := v_id;
    END IF;
ELSE
       IF v_res='0' THEN
         UPDATE SD_TIPOS_EGRESOS SET
         ID_CAJA =  p_id_caja ,  NOMBRE = p_nombre ,OBSERVACION = p_observacion ,  MONEDA  = p_moneda , IMPORTE = p_importe ,  LOGIN_USR  = p_usr  
          WHERE ID_TIPO  = p_id_tipo;
           
           v_res := v_id;
    END IF;

END IF; 

p_res := v_res;
COMMIT;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_GUARDAR_TIPO_EGRESO','P_SD_GUARDAR_TIPO_EGRESO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_TIPO_INGRESO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_TIPO_INGRESO(
p_id_tipo SINDICATO_121_2020.SD_TIPOS_INGRESOS_SOCIO.ID_TIPO%type, 
p_id_caja SINDICATO_121_2020.SD_TIPOS_INGRESOS_SOCIO.ID_CAJA%type,
p_nombre SINDICATO_121_2020.SD_TIPOS_INGRESOS_SOCIO.NOMBRE%type,
p_observacion SINDICATO_121_2020.SD_TIPOS_INGRESOS_SOCIO.OBSERVACION%type,
p_moneda SINDICATO_121_2020.SD_TIPOS_INGRESOS_SOCIO.MONEDA%type,
p_importe SINDICATO_121_2020.SD_TIPOS_INGRESOS_SOCIO.IMPORTE%type,
p_categoria SINDICATO_121_2020.SD_TIPOS_INGRESOS_SOCIO.CATEGORIA%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_id NUMBER := 0;
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
BEGIN
IF p_id_tipo  IS NULL OR p_id_caja IS NULL OR p_nombre IS NULL OR p_moneda IS NULL OR p_importe IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF p_id_tipo =  0 THEN
     
    IF v_res='0' THEN
        v_id := Q_SD_TIPOS_INGRESOS_SOCIO.nextval;
        INSERT INTO SINDICATO_121_2020.SD_TIPOS_INGRESOS_SOCIO  (ID_TIPO, ID_CAJA ,NOMBRE, OBSERVACION ,ESTADO, MONEDA ,IMPORTE, FECHA_REG, LOGIN_USR ,CATEGORIA  )
        VALUES( v_id, p_id_caja , p_nombre ,p_observacion ,'ACTIVO', p_moneda, p_importe , sysdate , p_usr , p_categoria );
         v_res := v_id;
    END IF;
ELSE
       IF v_res='0' THEN
         UPDATE SD_TIPOS_INGRESOS_SOCIO SET
         ID_CAJA =  p_id_caja ,  NOMBRE = p_nombre ,OBSERVACION = p_observacion ,  MONEDA  = p_moneda , IMPORTE = p_importe ,  LOGIN_USR  = p_usr  , CATEGORIA = p_categoria
          WHERE ID_TIPO  = p_id_tipo;
           
           v_res := v_id;
    END IF;

END IF; 

p_res := v_res;
COMMIT;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_GUARDAR_TIPO_INGRESO','P_SD_GUARDAR_TIPO_INGRESO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_TIPO_PRESTAMO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_GUARDAR_TIPO_PRESTAMO(
p_id_tipo SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.ID_TIPO%type, 
p_id_caja SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.ID_CAJA%type,
p_nombre SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.NOMBRE%type,
p_observacion SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.OBSERVACION%type,
p_moneda SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.MONEDA%type,
p_importe_maximo SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.IMPORTE_MAXIMO%type,
p_importe_minimo SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.IMPORTE_MINIMO%type,
p_interes SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.INTERES%type,
p_multa_por_mora SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.MULTA_POR_MORA%type,
p_semanas SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.SEMANAS%type,
p_categoria SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.CATEGORIA%type,
p_tipo_interes SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.TIPO_INTERES%type,
p_interes_fijo SINDICATO_121_2020.SD_TIPOS_PRESTAMOS.INTERES_FIJO%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_id NUMBER := 0;
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
BEGIN
IF p_id_tipo  IS NULL OR p_id_caja IS NULL OR p_nombre IS NULL OR p_moneda IS NULL OR p_importe_maximo IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF p_id_tipo =  0 THEN
     
    IF v_res='0' THEN
        v_id := Q_SD_TIPOS_PRESTAMOS.nextval;
        INSERT INTO SINDICATO_121_2020.SD_TIPOS_PRESTAMOS   (ID_TIPO, ID_CAJA ,NOMBRE, OBSERVACION ,ESTADO, MONEDA ,IMPORTE_MAXIMO, IMPORTE_MINIMO ,INTERES ,MULTA_POR_MORA ,SEMANAS  , FECHA_REG, LOGIN_USR ,CATEGORIA, INTERES_FIJO ,TIPO_INTERES  )
        VALUES( v_id, p_id_caja , p_nombre ,p_observacion ,'ACTIVO', p_moneda, p_importe_maximo ,p_importe_minimo , p_interes,p_multa_por_mora , p_semanas, sysdate , p_usr , p_categoria,p_interes_fijo , p_tipo_interes );
         v_res := v_id;
    END IF;
ELSE
       IF v_res='0' THEN
         UPDATE SD_TIPOS_PRESTAMOS SET
         ID_CAJA =  p_id_caja ,  NOMBRE = p_nombre ,OBSERVACION = p_observacion ,  MONEDA  = p_moneda , IMPORTE_MAXIMO  = p_importe_maximo , IMPORTE_MINIMO = p_importe_minimo ,INTERES = p_interes , MULTA_POR_MORA = p_multa_por_mora , SEMANAS = p_semanas  ,  LOGIN_USR  = p_usr  , CATEGORIA = p_categoria , INTERES_FIJO= p_interes_fijo , TIPO_INTERES = p_tipo_interes  
          WHERE ID_TIPO  = p_id_tipo;
           
           v_res := v_id;
    END IF;

END IF; 

p_res := v_res;
COMMIT;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_GUARDAR_TIPO_PRESTAMO','P_SD_GUARDAR_TIPO_PRESTAMO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_INGRESOS_POR_SOCIO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_INGRESOS_POR_SOCIO(
p_id_ingreso SINDICATO_121_2020.SD_INGRESOS_POR_SOCIOS.ID_INGRESO%type, 
p_id_socio_movil SINDICATO_121_2020.SD_INGRESOS_POR_SOCIOS.ID_SOCIO_MOVIL%type, 
p_id_tipo SINDICATO_121_2020.SD_INGRESOS_POR_SOCIOS.ID_TIPO_INGRESO %type, 
p_fecha SINDICATO_121_2020.SD_INGRESOS_POR_SOCIOS.FECHA%type,
p_importe SINDICATO_121_2020.SD_INGRESOS_POR_SOCIOS.IMPORTE%type,
p_observacion SINDICATO_121_2020.SD_INGRESOS_POR_SOCIOS.OBSERVACION%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_id NUMBER := 0;
v_id_caja NUMBER := 0;
v_moneda VARCHAR2(30);
v_ingreso VARCHAR2(255);
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
BEGIN
IF p_id_socio_movil  IS NULL OR p_id_tipo IS NULL OR p_fecha IS NULL OR p_importe IS NULL
THEN
v_res := 'Faltan parametros.';
END IF;

     
    IF v_res='0' THEN
        v_id := Q_SD_INGRESOS_POR_SOCIOS.nextval;
        select  ID_CAJA , MONEDA , NOMBRE INTO v_id_caja ,v_moneda , v_ingreso  from SD_TIPOS_INGRESOS_SOCIO WHERE  ID_TIPO =  p_id_tipo ;
        INSERT INTO SINDICATO_121_2020.SD_INGRESOS_POR_SOCIOS  (ID_INGRESO ,ID_SOCIO_MOVIL, ID_TIPO_INGRESO ,ID_CAJA ,FECHA ,IMPORTE, MONEDA ,OBSERVACION ,ESTADO ,FECHA_REG ,LOGIN_USR )
        VALUES( v_id, p_id_socio_movil , p_id_tipo , v_id_caja , p_fecha , p_importe , v_moneda ,p_observacion ,'NUEVO', sysdate , p_usr );
        
        INSERT INTO SD_KARDEX_EFECTIVO ( ID_KARDEX ,ID_CAJA ,ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO ,EGRESO ,SALDO ,LOGIN ,FECHA_REG  )
        VALUES (Q_SD_KARDEX_EFECTIVO.nextval ,v_id_caja ,v_id ,'INGRESOS POR SOCIOS' ,p_fecha ,v_ingreso, p_importe ,0 ,0 ,p_usr ,sysdate  ) ;
        
        
         v_res := v_id;
    END IF;
p_res := v_res;
COMMIT;
   P_SD_ACT_KARDEX_EFECTIVO(v_id_caja,p_fecha ,1 ,v_res);
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_INGRESOS_POR_SOCIO','P_SD_INGRESOS_POR_SOCIO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SG_GUARDAR_PERFIL_OPCION;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SG_GUARDAR_PERFIL_OPCION(
 p_id_perfil IN SD_PERFILES_OPCIONES.ID_PERFIL%TYPE,
 p_id_opc  IN SD_PERFILES_OPCIONES.ID_OPC%TYPE,
 p_id_usr   NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT  VARCHAR2
)
 /*
 
 Rev:
 */
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(100):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN

  -- Validamos nulos
  IF p_id_perfil IS NULL OR p_id_opc IS NULL  THEN
    v_res := 'Faltan parametros.';
  END IF;
  IF v_res='0' THEN
    -- Verificamos que la LISTA no exista 
    SELECT COUNT(*) INTO v_cnt FROM SD_PERFILES_OPCIONES  WHERE ID_PERFIL  = p_id_perfil AND ID_OPC =p_id_opc ;
    IF v_cnt > 0 THEN
      v_res := 'Ya existe perfil asociado con una opcion.';
    END IF;
  END IF;
  IF v_res='0' THEN
      -- Creamos la LISTA
      INSERT INTO SD_PERFILES_OPCIONES (ID_PRF_OPC ,ID_PERFIL ,ID_OPC ,ESTADO )
      VALUES(Q_SD_PERFILES_OPCIONES.nextval, p_id_perfil, p_id_opc,  'A');

      COMMIT;
      
      v_res := '1';
  END IF;
    
  p_res := v_res;
EXCEPTION
  WHEN OTHERS THEN
    ROLLBACK;
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Menu Opciones','P_SG_GUARDAR_PERFIL_OPCION','-',1,v_id_log);
    p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SG_GUARDAR_USUARIO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SG_GUARDAR_USUARIO(
p_id_usuario SD_USUARIOS.ID_USUARIO%type,
p_login SD_USUARIOS.LOGIN%type,
p_nombre SD_USUARIOS.NOMBRE%type,
p_email SD_USUARIOS.EMAIL%type,
p_id_perfil SD_USUARIOS.ID_PERFIL%type,
p_estado SD_USUARIOS.ESTADO%type,
p_contrasena SD_USUARIOS.CONTRASENA%type,
p_id_usr   NUMBER,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_id_usuario SD_USUARIOS.ID_USUARIO%type;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
BEGIN

IF p_id_usuario IS NULL OR p_login IS NULL OR p_nombre IS NULL OR p_estado IS NULL
OR p_contrasena IS NULL 
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
    
   if p_id_usuario = 0 THEN
         --creacion
        v_id_usuario := Q_SD_USUARIOS.nextval;
       
        SELECT count(*) into v_cnt FROM SD_USUARIOS WHERE LOGIN = p_LOGIN;
        IF v_cnt > 0 THEN
        
        v_res := 'ya existe el login : '||p_login||' Ingrese otro login...' ; 
       END IF;
        IF v_res = '0' THEN
             INSERT INTO SD_USUARIOS   VALUES  (v_id_usuario, p_login,p_nombre,p_email, sysdate,null, p_id_perfil,p_estado ,p_contrasena);
        
            v_res := '0';
        END IF;
       
        
    ELSE
          SELECT count(*) into v_cnt FROM SD_USUARIOS WHERE LOGIN = p_LOGIN AND ID_USUARIO <> p_id_usuario ;
            IF v_cnt > 0 THEN
            
                v_res := 'ya existe el login : '||p_login||' Ingrese otro login...' ; 
           END IF;
        --editar
         IF v_res = '0' THEN
            UPDATE SD_USUARIOS  SET LOGIN  = p_login,
                                   NOMBRE  = p_nombre,
                                   EMAIL  = p_email,
                                   ESTADO  = p_estado,
                                   CONTRASENA  = p_contrasena,
                                   ID_PERFIL  =  p_id_perfil
                                  WHERE ID_USUARIO   = p_id_usuario;
                                   v_res := '0';
        END IF;
    END IF;
END IF;
    if v_res = '0' THEN
        v_res := '1';
     COMMIT;
    ELSE
        ROLLBACK;       
    END IF;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'Modulo de Clientes','P_SG_GUARDAR_USUARIO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_ACT_HOJAS_DETALLES;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_ACT_HOJAS_DETALLES(
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
v_nro_movil  NUMBER := 0;
v_monto NUMBER := 0;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN

        FOR x IN (select * FROM SD_HOJAS_CONTROL) LOOP
         
         select SUM(IMPORTE ) INTO v_monto from SD_SOC_MOV_OBLIG  WHERE ID_SOCIO_MOVIL = x.ID_SOCIO_MOVIL;
         IF x.MONTO = v_monto THEN 
             
             INSERT INTO SD_DETALLES_HOJAS_CONTROL (ID_DETALLE ,ID_HOJA, ID_CAJA, OBLIGACION, IMPORTE ,LOGIN ,FECHA_REG )
                (
                SELECT Q_SD_DETALLES_HOJAS_CONTROL.nextval , x.id_hoja ,OB.ID_CAJA ,OB.OBLIGACION,OB.IMPORTE_DEFECTO , p_usr , sysdate  from SD_SOC_MOV_OBLIG soc , SD_OBLIGACIONES_HOJA  ob where SOC.ID_OBLIGACION =  OB.ID_OBLIGACION AND id_socio_movil = x.ID_SOCIO_MOVIL
                );
        
        END IF;
        END LOOP;
        
     
    COMMIT;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_ACT_HOJAS_DETALLES','P_ACT_HOJAS_DETALLES','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_ACT_HOJAS_OLD;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_ACT_HOJAS_OLD(
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
v_nro_movil  NUMBER := 0;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN

--       SELECT * FROM SINDICATO_121_2020_OLD.HOJA_CONTROL
--       
--       where id_movil NOT IN (SELECT ID_MOVIL FROM SD_MOVILES )
--       
--       select * from  SINDICATO_121_2020_OLD.HOJA_CONTROL where id_movil = 376
--       WHERE id_movil  IN (select id_movil from SINDICATO_121_2020_old.movil where id_linea = 1)
--       
--       
--       select * from sd_moviles where id_movil NOT IN (select id_movil from SINDICATO_121_2020_old.movil where id_linea = 2 )
--        
--       select * from SINDICATO_121_2020_OLD.MOVIL
--       
--       SELECT * from sd_socios
--       
--       select * from SD_SOCIO_MOVILES 
 
    --SELECT hoj.numero_hoja ,1, soc.id_socio_movil , 0 ,HOJ.FECHA_DE_COMPRA ,hoj.total_hoja ,HOJ.FECHA_DE_USO  , 'migracion de sistema', 'NUEVO','admin', HOJ.FECHA_DE_COMPRA from SINDICATO_121_2020_OLD.HOJA_CONTROL hoj , SD_SOCIO_MOVILES soc WHERE HOJ.ID_MOVIL = SOC.ID_MOVIL
     --select * from  SINDICATO_121_2020_OLD.HOJA_CONTROL  WHERE id_movil  IN (select id_movil from SINDICATO_121_2020_old.movil where id_linea = 1)
      FOR x IN (SELECT hoj.* , SOC.ID_SOCIO_MOVIL FROM  SINDICATO_121_2020_OLD.HOJA_CONTROL hoj , SD_SOCIO_MOVILES soc WHERE HOJ.ID_MOVIL = SOC.ID_MOVIL  and FALTA = 0  ) LOOP
    --  P_SD_CREAR_OBLIGACIONES(x.ID_SOCIO,sysdate,'Creacion Sistema','ADMIN',v_res);
            
             SELECT NRO_MOVIL INTO v_nro_movil  FROM SD_MOVILES mov , SD_SOCIO_MOVILES som WHERE MOV.ID_MOVIL = SOM.ID_MOVIL AND SOM.ESTADO = 'ACTIVO' AND SOM.ID_SOCIO_MOVIL = x.ID_SOCIO_MOVIL ;
            INSERT INTO SD_HOJAS_CONTROL ( ID_HOJA, ID_PARADA ,ID_SOCIO_MOVIL ,ID_CHOFER ,NRO_HOJA ,FECHA_COMPRA ,MONTO ,FECHA_USO ,OBSERVACION, ESTADO, LOGIN ,FECHA_REG  )
            VALUES (x.numero_hoja, 1 , x.id_socio_movil ,null,0 ,x.fecha_de_compra ,x.total_hoja ,x.fecha_de_uso ,'MIGRACION DE SISTEMA','NUEVO', 'admin' ,x.fecha_de_compra);
            
             INSERT INTO SD_KARDEX_EFECTIVO ( ID_KARDEX ,ID_CAJA ,ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO ,EGRESO ,SALDO ,LOGIN ,FECHA_REG  )
        VALUES (Q_SD_KARDEX_EFECTIVO.nextval ,14 ,x.numero_hoja ,'VENTA HOJA' ,x.fecha_de_compra ,'VENTA HOJA Nro. MOVIL : '||v_nro_movil  ,x.total_hoja ,0 ,0 ,p_usr ,sysdate  ) ;
        
        
            
      END LOOP;
    COMMIT;
     P_SD_ACT_KARDEX_EFECTIVO(14,TO_DATE('1990','YYYY') ,1 ,v_res);

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_ACT_HOJAS_OLD','P_ACT_HOJAS_OLD','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_ACT_KARDEX_HOJA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_ACT_KARDEX_HOJA(
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN

      --FOR x IN (SELECT * FROM  SD_SOCIO_MOVILES  WHERE ID_SOCIO_MOVIL IN (605 , 428 , 318)   ) LOOP
        FOR x IN (SELECT * FROM  SD_SOCIO_MOVILES     ) LOOP      
    --  SELECT * FROM SD_SOCIO_MOVILES 
          SELECT MIN(FECHA_COMPRA) INTO v_fecha FROM SD_HOJAS_CONTROL WHERE ID_SOCIO_MOVIL = x.id_socio_movil   ;
         SINDICATO_121_2020.P_SD_ACT_KARDEX_HOJA ( x.id_socio_movil,  v_fecha , P_USR, P_RES );
    --  P_SD_CREAR_OBLIGACIONES(x.ID_SOCIO,sysdate,'Creacion Sistema','ADMIN',v_res);
    --  select * from SD_KARDEX_HOJAS 
      END LOOP;

    COMMIT;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_ACT_KARDEX_HOJA','P_ACT_KARDEX_HOJA','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_ACT_KARDEX_HOJA_FECHA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_ACT_KARDEX_HOJA_FECHA(
p_usr VARCHAR2,
p_fecha date,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN

      --FOR x IN (SELECT * FROM  SD_SOCIO_MOVILES  WHERE ID_SOCIO_MOVIL IN (605 , 428 , 318)   ) LOOP
        FOR x IN (SELECT * FROM  SD_SOCIO_MOVILES  WHERE ESTADO = 'ACTIVO'   ) LOOP      
    --  SELECT * FROM SD_SOCIO_MOVILES 
          SELECT MIN(FECHA_COMPRA) INTO v_fecha FROM SD_HOJAS_CONTROL WHERE ID_SOCIO_MOVIL = x.id_socio_movil   ;
         SINDICATO_121_2020.P_SD_ACT_KARDEX_HOJA ( x.id_socio_movil,  p_fecha , P_USR, P_RES );
    --  P_SD_CREAR_OBLIGACIONES(x.ID_SOCIO,sysdate,'Creacion Sistema','ADMIN',v_res);
    --  select * from SD_KARDEX_HOJAS 
      END LOOP;

    COMMIT;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_ACT_KARDEX_HOJA','P_ACT_KARDEX_HOJA','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_ACT_NRO_HOJAS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_ACT_NRO_HOJAS(
p_usr VARCHAR2,
p_mes VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
v_nro_movil  NUMBER := 0;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN  
       FOR x IN (SELECT * FROM SD_SOCIO_MOVILES  WHERE ESTADO = 'ACTIVO') LOOP
               v_cnt := 0;
               FOR hoj IN (SELECT * FROM SD_HOJAS_CONTROL WHERE TO_CHAR(FECHA_COMPRA , 'MM/YYYY') = p_mes AND ESTADO = 'NUEVO' AND  ID_SOCIO_MOVIL = x.ID_SOCIO_MOVIL  ORDER  BY FECHA_COMPRA ASC) LOOP
                          v_cnt := v_cnt + 1;
                          UPDATE SD_HOJAS_CONTROL SET NRO_HOJA = v_cnt WHERE ID_HOJA  = hoj.id_hoja;
                END LOOP;
       
       END LOOP;

     
    COMMIT;
 
END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_ACT_NRO_HOJAS','P_ACT_NRO_HOJAS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_ACT_OBLIGACIONES_SOCIO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_ACT_OBLIGACIONES_SOCIO(
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN

      FOR x IN (SELECT * FROM  SD_SOCIOS   ) LOOP
      P_SD_CREAR_OBLIGACIONES(x.ID_SOCIO,sysdate,'Creacion Sistema','ADMIN',v_res);
      
      END LOOP;

    COMMIT;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_ACT_OBLIGACIONES_SOCIO','P_ACT_OBLIGACIONES_SOCIO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_ACT_OBLIG_SOC_MOV_HOJ;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_ACT_OBLIG_SOC_MOV_HOJ(
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN

      FOR x IN (SELECT * FROM  SD_SOCIO_MOVILES    ) LOOP
      
            FOR y IN (SELECT * FROM SD_OBLIGACIONES_HOJA   ) LOOP
              INSERT INTO  SD_SOC_MOV_OBLIG (ID_SOC_MOV_OBLIG, ID_OBLIGACION ,ID_SOCIO_MOVIL ,IMPORTE, FECHA_REG ,LOGIN ) VALUES
              (Q_SD_SOC_MOV_OBLIG.nextval,y.ID_OBLIGACION , x.ID_SOCIO_MOVIL , y.IMPORTE_DEFECTO , sysdate , p_usr);
            END LOOP;
    --  P_SD_CREAR_OBLIGACIONES(x.ID_SOCIO,sysdate,'Creacion Sistema','ADMIN',v_res);
      
      END LOOP;

    COMMIT;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_ACT_OBLIGACIONES_SOCIO','P_ACT_OBLIGACIONES_SOCIO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_ACT_PAGOS_AHORROS;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_ACT_PAGOS_AHORROS(
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN

        FOR x IN (SELECT * FROM  SD_SOCIO_MOVILES     ) LOOP      
         SINDICATO_121_2020.P_SD_ACT_PAGOS_SOCIOS ( x.id_socio_movil , P_USR, P_RES );
      END LOOP;

    COMMIT;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_ACT_PAGOS_AHORROS','P_ACT_PAGOS_AHORROS','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_ACT_PRESTAMO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_ACT_PRESTAMO(
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
BEGIN
IF v_res =  '0' THEN

      --FOR x IN (SELECT * FROM  SD_SOCIO_MOVILES  WHERE ID_SOCIO_MOVIL IN (605 , 428 , 318)   ) LOOP
        FOR x IN (SELECT * FROM  SD_PRESTAMOS_POR_SOCIOS     ) LOOP      
    --  SELECT * FROM SD_SOCIO_MOVILES 
         SINDICATO_121_2020.P_SD_ACT_PLAN_PAGOS(x.ID_PRESTAMO,1,P_RES );
    --  P_SD_CREAR_OBLIGACIONES(x.ID_SOCIO,sysdate,'Creacion Sistema','ADMIN',v_res);
    --  select * from SD_KARDEX_HOJAS 
      END LOOP;

    COMMIT;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_ACT_PRESTAMO','P_ACT_PRESTAMO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_AUX_ACT_SECUENCIA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_AUX_ACT_SECUENCIA(
 p_nom_sec VARCHAR2, -- Nombre de la secuencia (debe incluir el ESQUEMA)
 p_ini_sec NUMBER , --Numero de inicio de la secuencia
 p_res OUT VARCHAR2)
 IS
  v_errc SINDICATO_121_2020.sd_aux_log_errores.cod_error%type;
  v_errD SINDICATO_121_2020.sd_aux_log_errores.desc_error%type;
  v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
  v_sec NUMBER:=1;
  v_sql VARCHAR(100):='';
 BEGIN
 -- numeros 
    IF p_ini_sec > 0 THEN
       -- Obtenemos el siguiente valor de la secuencia (porque currval lo requiere)
       v_sql := 'SELECT ' || p_nom_sec || '.NEXTVAL FROM dual';   
       EXECUTE IMMEDIATE (v_sql) INTO v_sec;
       -- Obtenemos el valor de secuencia actual
       v_sql := 'SELECT ' || trim(p_nom_sec) || '.CURRVAL FROM dual';
       EXECUTE IMMEDIATE (v_sql) INTO v_sec;
       -- Actualizamos el Incremento con el valor actual, pero Negativo
       v_sql := 'ALTER SEQUENCE ' || p_nom_sec || ' INCREMENT BY -' || v_sec || ' MINVALUE 0'; 
       EXECUTE IMMEDIATE (v_sql);
       -- Obtenemos el Siguiente valor con incremento negativo, O sea, reiniciamos a 0 
       v_sql := 'SELECT ' || p_nom_sec || '.NEXTVAL FROM dual';   
       EXECUTE IMMEDIATE (v_sql) INTO v_sec;
       --Incrementamos la secuenta por el valor introducido
       v_sql := 'ALTER SEQUENCE ' || p_nom_sec || ' INCREMENT BY ' || p_ini_sec || ' MINVALUE 0'; 
       EXECUTE IMMEDIATE (v_sql);
       --Actualizamos la secuencia por el nuevo valor
       v_sql := 'SELECT ' || p_nom_sec || '.NEXTVAL FROM dual';   
       EXECUTE IMMEDIATE (v_sql) INTO v_sec;
       -- Reponemos el Incremento a UNO
       v_sql := 'ALTER SEQUENCE ' || p_nom_sec || ' INCREMENT BY 1 MINVALUE 0';
       EXECUTE IMMEDIATE (v_sql);
        --Q_MN_SOLICITUDES_MAN 
       p_res := '1';
    ELSIF  p_ini_sec = 0 THEN
       --p_ini_sec := 1;
    -- Obtenemos el siguiente valor de la secuencia (porque currval lo requiere)
       v_sql := 'SELECT ' || p_nom_sec || '.NEXTVAL FROM dual';   
       EXECUTE IMMEDIATE (v_sql) INTO v_sec;
       -- Obtenemos el valor de secuencia actual
       v_sql := 'SELECT ' || trim(p_nom_sec) || '.CURRVAL FROM dual';
       EXECUTE IMMEDIATE (v_sql) INTO v_sec;
       -- Actualizamos el Incremento con el valor actual, pero Negativo
       v_sql := 'ALTER SEQUENCE ' || p_nom_sec || ' INCREMENT BY -' || v_sec || ' MINVALUE 0'; 
       EXECUTE IMMEDIATE (v_sql);
       -- Obtenemos el Siguiente valor con incremento negativo, O sea, reiniciamos a 0 
       v_sql := 'SELECT ' || p_nom_sec || '.NEXTVAL FROM dual';   
       EXECUTE IMMEDIATE (v_sql) INTO v_sec;
       --Incrementamos la secuenta por el valor introducido
       v_sql := 'ALTER SEQUENCE ' || p_nom_sec || ' INCREMENT BY 1 MINVALUE 0'; 
       EXECUTE IMMEDIATE (v_sql);
     --   v_sql := 'ALTER SEQUENCE ' || p_nom_sec || ' INCREMENT BY ' || p_ini_sec || ' MINVALUE 0'; 
      -- EXECUTE IMMEDIATE (v_sql);
    END IF;

 EXCEPTION 
   WHEN OTHERS THEN
      ROLLBACK;   
      v_errC:=substr(sqlcode,1,20);
      v_errD:=substr(sqlerrm,1,200);
      p_grabar_error_bd(v_errC,v_errD,'Procedimiento generico','P_REINICIAR_SECUENCIA','-'||p_nom_sec,0,v_id_log);
      p_res := 'Reset Secuencias  ->ERROR. LOG generado #' || v_id_log;
 END;
/


DROP PROCEDURE SINDICATO_121_2020.P_AUX_ACT_SECUENCIA_A;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_AUX_ACT_SECUENCIA_A(
  p_criterio VARCHAR2 , --Criterio de LIKE para buscar en los nombres de SECUENCIAS
  p_res OUT NUMBER  -- Mensaje de OK ("1") o Descripcion del error
  
)
 /*
 Finalidad:Actualizar todas las secuencias de un Esquema con algun criterio LIKE si correxponde
 Retorna: p_res(parametro de salida)->Mensaje de OK (1) o Nro de LOG de error generado.
 Fecha Creacion: 17/01/2013
 Autor: Ubaldo Villazon
 */
IS
 v_criterio VARCHAR2(100):='';
 v_res VARCHAR2(100):='0';
 v_tabla VARCHAR2(200) := '';
 v_column_id VARCHAR2(200) := '';
 v_id NUMBER := 0 ;
 v_count number;
 v_errc   SINDICATO_121_2020.sd_aux_log_errores.cod_error%type;
 v_errd   SINDICATO_121_2020.sd_aux_log_errores.desc_error%type;
 v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
 v_sql VARCHAR(1000):='';
BEGIN
  --Si criterio LIKE es null poemos un valor por defecto
  IF p_criterio IS NULL THEN
        v_criterio := '%';
  ELSE 
        v_criterio :=  p_criterio;   
  END IF;
  
    --Obtener Todas las secuencias con el criterio ingresaado 
  FOR x IN (SELECT * from ALL_SEQUENCES s WHERE S.SEQUENCE_OWNER = 'SINDICATO_121_2020' AND S.SEQUENCE_NAME LIKE v_criterio)
      LOOP
          --Recuperamos la tabla de la secuencia
          SELECT substr(X.SEQUENCE_NAME,3,length(X.SEQUENCE_NAME)-2) INTO v_tabla from dual;
          -- Verificamos si la tabla contiene un constraint
          SELECT COUNT(*) INTO v_count  FROM ALL_CONS_COLUMNS WHERE OWNER = 'SINDICATO_121_2020' AND TABLE_NAME = v_tabla AND POSITION = 1 ; 
          IF v_count > 0 THEN
            --recuperamos la columna del primary key de la tabla
            SELECT  COLUMN_NAME INTO v_column_id FROM ALL_CONS_COLUMNS WHERE OWNER = 'SINDICATO_121_2020' AND TABLE_NAME = v_tabla AND  CONSTRAINT_NAME IN (Select constraint_name from user_constraints where table_name = v_tabla AND CONSTRAINT_TYPE = 'P');
                    
            --Obtenemos el max ID de la tabla
            v_sql := 'SELECT MAX(' || v_column_id || ') FROM '||v_tabla;   
            EXECUTE IMMEDIATE (v_sql) INTO v_id;
            --En caso de que no exista registros el valor 0 lo mantenemos
            IF v_id is null THEN
                v_id := 0;
            END IF;
            --llamamos al proceso que actualiza la secuencia 
            P_AUX_ACT_SECUENCIA(X.SEQUENCE_NAME , v_id,v_res);
          END IF;
      END LOOP;
 
EXCEPTION
  WHEN OTHERS THEN
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Procedimiento generico','P_AUX_ACT_SECUENCIA_A','-',0,v_id_log);
    p_res := v_id_log;
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_AUX_REINICIAR_SECUENCIA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_AUX_REINICIAR_SECUENCIA(
 p_nom_sec VARCHAR2, -- Nombre de la secuencia (debe incluir el ESQUEMA)
 p_res OUT VARCHAR2)
 IS
  v_errc sd_aux_log_errores.cod_error%type;
  v_errD sd_aux_log_errores.desc_error%type;
  v_id_log sd_aux_log_errores.id_log%type;
  v_sec NUMBER:=1;
  v_sql VARCHAR(100):='';
 BEGIN
   -- Obtenemos el siguiente valor de la secuencia (porque currval lo requiere)
   v_sql := 'SELECT ' || p_nom_sec || '.NEXTVAL FROM dual';   
   EXECUTE IMMEDIATE (v_sql) INTO v_sec;
   -- Obtenemos el valor de secuencia actual
   v_sql := 'SELECT ' || trim(p_nom_sec) || '.CURRVAL FROM dual';
   EXECUTE IMMEDIATE (v_sql) INTO v_sec;
   -- Actualizamos el Incremento con el valor actual, pero Negativo
   v_sql := 'ALTER SEQUENCE ' || p_nom_sec || ' INCREMENT BY -' || v_sec || ' MINVALUE 0'; 
   EXECUTE IMMEDIATE (v_sql);
   -- Obtenemos el Siguiente valor con incremento negativo, O sea, reiniciamos a 0 
   v_sql := 'SELECT ' || p_nom_sec || '.NEXTVAL FROM dual';   
   EXECUTE IMMEDIATE (v_sql) INTO v_sec;
   -- Reponemos el Incremento a UNO
   v_sql := 'ALTER SEQUENCE ' || p_nom_sec || ' INCREMENT BY 1 MINVALUE 0';
   EXECUTE IMMEDIATE (v_sql);
    
   p_res := '1';

 EXCEPTION 
   WHEN OTHERS THEN
      ROLLBACK;   
      v_errC:=substr(sqlcode,1,20);
      v_errD:=substr(sqlerrm,1,200);
      p_grabar_error_bd(v_errC,v_errD,'Procedimiento generico','P_REINICIAR_SECUENCIA','-'||p_nom_sec,0,v_id_log);
      p_res := 'Reset Secuencias  ->ERROR. LOG generado #' || v_id_log;
 END;
/


DROP PROCEDURE SINDICATO_121_2020.P_BACKUP_SERVER132;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_BACKUP_SERVER132(
 p_res OUT  VARCHAR2
)

IS
 v_cnt NUMBER:=0;
 contador NUMBER:=0;
 v_res VARCHAR2(100):='0'; 
v_sql VARCHAR2(1000):='';
 x NUMBER:=0;
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;

BEGIN
   
  IF v_res='0' THEN
  
     INSERT INTO SD_JOBS_BACKUP (ID_BACKUP , FECHA_REG) VALUES (Q_SD_JOBS_BACKUP.nextval , sysdate);
      
      FOR x IN (SELECT * FROM BACKUP_SINDICATO ORDER BY ORDEN DESC) LOOP
          v_sql := 'DELETE FROM '||x.TABLA||'@DBSINDICATO_121_2020_SERVER132';
          EXECUTE IMMEDIATE v_sql ;
           --SELECT * FROM SD_AUTOS@DBSINDICATO_BACKUP
       END LOOP;
       
      FOR x IN (SELECT * FROM BACKUP_SINDICATO ORDER BY ORDEN ASC) LOOP
          v_sql := 'INSERT INTO  '||x.TABLA||'@DBSINDICATO_121_2020_SERVER132 (SELECT * FROM '||x.TABLA ||')';
          EXECUTE IMMEDIATE v_sql ;
           --SELECT * FROM SD_AUTOS@DBSINDICATO_BACKUP
 --          INSERT INTO SD_AUTOS@DBSINDICATO_BACKUP (select * FROM SD_AUTOS)
       END LOOP;
      
       
  
  
      COMMIT; 
        v_res := '1';
      
  END IF;
  p_res := v_res;

EXCEPTION
  WHEN OTHERS THEN
   -- ROLLBACK;
      v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'P_BACKUP_SERVER132','P_BACKUP_SERVER132','-','-',v_id_log);


END;
/


DROP PROCEDURE SINDICATO_121_2020.P_EE_SECUENCIA;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.p_ee_secuencia( p_cod_tabla varchar2, 
 p_id_usr NUMBER,    -- ID del usuario que realiza la operacion
 p_res OUT NUMBER
)
 /*
 Finalidad: Procedimiento para retornar un valor de secuencia (correlativo) para una tabla dada
 Recibe: 1-> p_tabla: Codigo del Nombre de la tabla asociada a un SEQUENCE
 Retorna: p_res(parametro de salida)->valor numerico que indica el correlativo
 Fecha Creacion: 20/07/2012
 Autor: Henry Terceros
 */
IS
 v_res NUMBER:=0;
 v_seq NUMBER:=0;
 v_cnt NUMBER:=0;
 v_sql    VARCHAR2(1000);
 v_errC   SINDICATO_121_2020.SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD   SINDICATO_121_2020.SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SINDICATO_121_2020.SD_AUX_LOG_ERRORES.id_log%type;
BEGIN
  --  v_tabla :=   p_cod_tabla;
  
  -- Obtenemos el correlativo de movimientos desde un SEQUENCE
  v_sql := 'SELECT SINDICATO_121_2020.q_' || trim(p_cod_tabla) || '.nextval FROM dual';
  EXECUTE IMMEDIATE(v_sql) INTO v_seq;
    
  p_res:=v_seq;
   
EXCEPTION
  WHEN OTHERS THEN
    v_errC:=substr(sqlcode,1,20);
    v_errD:=substr(sqlerrm,1,200);
    p_grabar_error_bd(v_errC,v_errD,'Determinar Sequencia','p_ee_secuencia','-',p_id_usr,v_id_log);
    p_res := -1; --error
END;
/


DROP PROCEDURE SINDICATO_121_2020.P_JOBS_BACKUP;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_JOBS_BACKUP
IS
 v_res VARCHAR2(100):='0'; 
BEGIN
   
  SINDICATO_121_2020.P_BACKUP_SERVER132( v_res );
  COMMIT; 


END;
/


DROP PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_CIERRE_AHORRO;

CREATE OR REPLACE PROCEDURE SINDICATO_121_2020.P_SD_ACT_KARDEX_CIERRE_AHORRO(
p_id_cierre  SD_CIERRES .ID_CIERRE %type, 
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_121_2020.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
v_nro_movil  NUMBER := 0;
v_monto NUMBER := 0;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN

        FOR x IN (select * FROM SD_DETALLE_CIERRES_AHORRO WHERE ID_CIERRE = p_id_cierre  ) LOOP
           
        INSERT INTO SD_KARDEX_SOCIO_MOVIL ( ID_KARDEX , ID_SOCIO_MOVIL, ID_OPERACION, OPERACION ,FECHA ,DETALLE ,INGRESO, EGRESO ,SALDO, LOGIN ,FECHA_REG  )
        VALUES(Q_SD_KARDEX_SOCIO_MOVIL.nextval ,x.ID_SOCIO_MOVIL , p_id_cierre , 'Cierre con Codigo :  '||p_id_cierre , to_date(to_char(sysdate,'DD/MM/YYYY'),'DD/MM/YYYY') , 'INGRESO POR CIERRE DE MES', x.TOTAL_AHORRO,0,0,p_usr,sysdate) ;
        COMMIT;
        P_SD_ACT_KARDEX_SOCIO_MOVIL(x.ID_SOCIO_MOVIL ,  to_date(to_char(sysdate,'DD/MM/YYYY'),'DD/MM/YYYY') , p_usr,v_res  );
        END LOOP;
        
        v_res := '1';
      --  select to_date(to_char(sysdate,'DD/MM/YYYY'),'DD/MM/YYYY') from dual
     
    COMMIT;

END IF; 

p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_ACT_KARDEX_CIERRE_AHORRO','P_SD_ACT_KARDEX_CIERRE_AHORRO','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/
DROP VIEW SINDICATO_121_2020.V_TABLAS_COLUMNAS;

/* Formatted on 11/28/2020 8:02:18 AM (QP5 v5.136.908.31019) */
CREATE OR REPLACE FORCE VIEW SINDICATO_121_2020.V_TABLAS_COLUMNAS
(
   ID_TABLA,
   TABLA,
   COLUMNA,
   TIPO,
   PRECISION,
   ESCALA,
   TAMANO,
   REQUERIDO,
   COMENTARIO
)
AS
   SELECT u.COLUMN_ID,
          u.TABLE_NAME,
          U.COLUMN_NAME,
          U.DATA_TYPE,
          U.DATA_PRECISION,
          U.DATA_SCALE,
          U.DATA_LENGTH,
          U.NULLABLE,
          A.COMMENTS
     FROM USER_TAB_COLUMNS u, ALL_COL_COMMENTS a
    WHERE     u.table_name = a.table_NAME
          AND a.owner = 'SINDICATO_121_2020'
          AND a.column_name = u.column_name;

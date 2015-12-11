DROP PROCEDURE SINDICATO.P_AUX_CONSTRUCTOR_SP_GRABAR;

--
-- P_AUX_CONSTRUCTOR_SP_GRABAR  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_AUX_CONSTRUCTOR_SP_GRABAR(p_tabla varchar2, p_parte number) 
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


DROP PROCEDURE SINDICATO.P_BACKUPTRAILER;

--
-- P_BACKUPTRAILER  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_BACKUPTRAILER(
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
      FOR x IN (SELECT  *   FROM all_tables WHERE OWNER = 'SINDICATO' AND TABLE_NAME NOT IN   (select distinct table_name   from all_constraints WHERE OWNER = 'SINDICATO' and constraint_type = 'R') ) LOOP
      v_sql := 'DELETE FROM SINDICATO.'||x.TABLE_NAME||'';
      DBMS_OUTPUT.PUT_LINE(  v_sql );
     EXECUTE IMMEDIATE v_sql ;
     DBMS_OUTPUT.PUT_LINE(  v_sql );
      v_sql := 'INSERT INTO SINDICATO.'||x.TABLE_NAME||' (SELECT * FROM  '||x.TABLE_NAME||'@DBSINDICATO)';        
       --DBMS_OUTPUT.PUT_LINE(  v_sql );
      -- INSERT INTO AUX_SALIDAS_CONT  VALUES(Q_AUX_SALIDAS_CONT.nextval,x.ID_SALIDA  , x.FECHA ,v_res);
        EXECUTE IMMEDIATE v_sql ;
           
       END LOOP;
  
  
      FOR x IN (SELECT  *   FROM all_tables WHERE OWNER = 'SINDICATO' AND TABLE_NAME  IN (select distinct table_name   from all_constraints WHERE OWNER = 'SINDICATO' and constraint_type = 'R' )ORDER BY  TABLE_NAME ASC ) LOOP
      v_sql := 'DELETE FROM SINDICATO.'||x.TABLE_NAME||'';
      DBMS_OUTPUT.PUT_LINE(  v_sql );
     EXECUTE IMMEDIATE v_sql ;
     DBMS_OUTPUT.PUT_LINE(  v_sql );
      v_sql := 'INSERT INTO SINDICATO.'||x.TABLE_NAME||' (SELECT * FROM  '||x.TABLE_NAME||'@DBSINDICATO )';        
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


DROP PROCEDURE SINDICATO.P_GRABAR_ERROR_BD;

--
-- P_GRABAR_ERROR_BD  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.p_grabar_error_bd( 
 p_errC      SINDICATO.sd_aux_log_errores.cod_error%type,
 p_errD      SINDICATO.sd_aux_log_errores.desc_error%type,
 p_modulo    SINDICATO.sd_aux_log_errores.modulo%type,
 p_nombre_sp SINDICATO.sd_aux_log_errores.nombre_sp%TYPE,
 p_cad_sql   SINDICATO.sd_aux_log_errores.cad_sql%type,
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
  v_id_log  SINDICATO.sd_aux_log_errores.id_log%type;

  PRAGMA AUTONOMOUS_TRANSACTION; -- Para que solo haga el COMMIT de las operaciones de este SP
BEGIN
  SELECT SINDICATO.q_sd_aux_log_errores.nextval INTO v_id_log FROM dual;
  
  INSERT INTO SINDICATO.sd_aux_log_errores(id_log, login_usr, fecha, modulo, nombre_sp, cod_error, desc_error, cad_sql) 
  VALUES(v_id_log, p_login_usr, SYSDATE, p_modulo, p_nombre_sp, p_errC, p_errD, substr(p_cad_sql,1,1000));
  COMMIT;
  
  p_id_log := v_id_log;
END;
/


DROP PROCEDURE SINDICATO.P_REC_PARAMETROS;

--
-- P_REC_PARAMETROS  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_REC_PARAMETROS(
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


DROP PROCEDURE SINDICATO.P_SD_ACT_KARDEX_DEBE;

--
-- P_SD_ACT_KARDEX_DEBE  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ACT_KARDEX_DEBE(
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


DROP PROCEDURE SINDICATO.P_SD_ACT_KARDEX_EFECTIVO;

--
-- P_SD_ACT_KARDEX_EFECTIVO  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ACT_KARDEX_EFECTIVO(
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


DROP PROCEDURE SINDICATO.P_SD_ACT_KARDEX_FM;

--
-- P_SD_ACT_KARDEX_FM  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ACT_KARDEX_FM(
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


DROP PROCEDURE SINDICATO.P_SD_ACT_KARDEX_SOCIO;

--
-- P_SD_ACT_KARDEX_SOCIO  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ACT_KARDEX_SOCIO(
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


DROP PROCEDURE SINDICATO.P_SD_ACT_OBLIGACIONES;

--
-- P_SD_ACT_OBLIGACIONES  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ACT_OBLIGACIONES(
p_id_socio SINDICATO.SD_OBLIGACIONES_SOCIO.ID_SOCIO%type,
p_id_obligacion SINDICATO.SD_OBLIGACIONES_SOCIO.ID_OBLIGACION%type,
p_fecha SINDICATO.SD_KARDEX_OBLIGACION.FECHA %type,
p_motivo SINDICATO.SD_KARDEX_OBLIGACION.MOTIVO%type,
p_importe_nuevo SINDICATO.SD_KARDEX_OBLIGACION.IMPORTE_NUEVO%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO.sd_aux_log_errores.id_log%type;
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


DROP PROCEDURE SINDICATO.P_SD_ALTA_AUTOS;

--
-- P_SD_ALTA_AUTOS  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ALTA_AUTOS(
p_id_auto SINDICATO.SD_AUTOS.ID_AUTO%type,
p_tipo SINDICATO.SD_AUTOS.TIPO%type,
p_color SINDICATO.SD_AUTOS.COLOR%type,
p_marca SINDICATO.SD_AUTOS.MARCA%type,
p_modelo SINDICATO.SD_AUTOS.MODELO%type,
p_placa SINDICATO.SD_AUTOS.PLACA%type,
p_motor SINDICATO.SD_AUTOS.MOTOR%type,
p_chasis SINDICATO.SD_AUTOS.CHASIS%type,
p_descripcion SINDICATO.SD_AUTOS.DESCRIPCION%type,
p_fecha_alta SINDICATO.SD_AUTOS.FECHA_ALTA%type,
p_fecha_baja SINDICATO.SD_AUTOS.FECHA_BAJA%type,
p_id_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_id_auto SINDICATO.SD_AUTOS.ID_AUTO%type;
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO.sd_aux_log_errores.id_log%type;
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
            INSERT INTO SINDICATO.SD_AUTOS (id_auto  ,tipo ,color ,marca ,modelo ,placa ,motor ,chasis ,descripcion ,fecha_alta ,fecha_baja  ,fecha_reg ,login_usr )
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


DROP PROCEDURE SINDICATO.P_SD_ALTA_LISTA;

--
-- P_SD_ALTA_LISTA  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ALTA_LISTA(
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


DROP PROCEDURE SINDICATO.P_SD_ALTA_SD_CHOFERES;

--
-- P_SD_ALTA_SD_CHOFERES  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ALTA_SD_CHOFERES(
p_id_chofer SINDICATO.SD_CHOFERES.ID_CHOFER%type,
p_nro_chofer SINDICATO.SD_CHOFERES.NRO_CHOFER%type,
p_nombre SINDICATO.SD_CHOFERES.NOMBRE%type,
p_apellido_paterno SINDICATO.SD_CHOFERES.APELLIDO_PATERNO%type,
p_apellido_materno SINDICATO.SD_CHOFERES.APELLIDO_MATERNO%type,
p_nro_licencia SINDICATO.SD_CHOFERES.NRO_LICENCIA%type,
p_categoria_lic SINDICATO.SD_CHOFERES.CATEGORIA_LIC%type,
p_ci SINDICATO.SD_CHOFERES.CI%type,
p_expedido SINDICATO.SD_CHOFERES.EXPEDIDO%type,
p_fecha_nac SINDICATO.SD_CHOFERES.FECHA_NAC%type,
p_fecha_ingreso SINDICATO.SD_CHOFERES.FECHA_INGRESO%type,
p_domicilio SINDICATO.SD_CHOFERES.DOMICILIO%type,
p_observacion SINDICATO.SD_CHOFERES.OBSERVACION%type,
p_estado_civil SINDICATO.SD_CHOFERES.ESTADO_CIVIL%type,
p_telefono SINDICATO.SD_CHOFERES.TELEFONO%type,
p_celular SINDICATO.SD_CHOFERES.CELULAR%type,
p_id_socio SINDICATO.SD_CHOFERES.ID_SOCIO%type,
p_id_usr NUMBER,
p_res OUT VARCHAR2
)
IS
v_id_chofer SINDICATO.SD_CHOFERES.ID_CHOFER%type;
v_id_socio SINDICATO.SD_CHOFERES.ID_SOCIO%type;
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO.sd_aux_log_errores.id_log%type;
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
        INSERT INTO SINDICATO.SD_CHOFERES (id_chofer ,nro_chofer ,nombre ,apellido_paterno 
        ,apellido_materno ,nro_licencia ,categoria_lic ,ci ,expedido ,fecha_nac ,fecha_ingreso ,
        fecha_baja ,domicilio ,observacion ,estado_civil ,id_socio ,fecha_reg ,id_usr ,estado, telefono, celular )

        VALUES( v_id_chofer,p_nro_chofer ,p_nombre ,p_apellido_paterno ,p_apellido_materno
         ,p_nro_licencia ,p_categoria_lic ,p_ci ,p_expedido ,p_fecha_nac ,p_fecha_ingreso ,
         null ,p_domicilio ,p_observacion ,p_estado_civil ,p_id_socio ,sysdate ,p_id_usr ,'ALTA', p_telefono, p_celular );
         
         INSERT INTO SINDICATO.SD_GARANTES(ID_GARANTE ,ID_CHOFER, ID_SOCIO, OBSERVACION ,FECHA_INI, FECHA_REG ,ESTADO ,ID_USR  )
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


DROP PROCEDURE SINDICATO.P_SD_ALTA_SD_FAMILIARES;

--
-- P_SD_ALTA_SD_FAMILIARES  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ALTA_SD_FAMILIARES(
p_id_familiar SINDICATO.SD_FAMILIARES.ID_FAMILIAR%type,
p_id_socio SINDICATO.SD_FAMILIARES.ID_SOCIO%type,
p_id_chofer SINDICATO.SD_FAMILIARES.ID_CHOFER%type,
p_nombre SINDICATO.SD_FAMILIARES.NOMBRE%type,
p_apellido_paterno SINDICATO.SD_FAMILIARES.APELLIDO_PATERNO%type,
p_apellido_materno SINDICATO.SD_FAMILIARES.APELLIDO_MATERNO%type,
p_ci SINDICATO.SD_FAMILIARES.CI%type,
p_expedido SINDICATO.SD_FAMILIARES.EXPEDIDO%type,
p_fecha_nac SINDICATO.SD_FAMILIARES.FECHA_NAC%type,
p_parentesco SINDICATO.SD_FAMILIARES.PARENTESCO%type,
p_observacion SINDICATO.SD_FAMILIARES.OBSERVACION%type,
p_direccion SINDICATO.SD_FAMILIARES.DIRECCION%type,
p_telefono SINDICATO.SD_FAMILIARES.TELEFONO%type,
p_id_usr NUMBER,
p_res OUT VARCHAR2
)
IS
v_id_familiar SINDICATO.SD_FAMILIARES.ID_FAMILIAR%type;
v_cnt NUMBER:=0;
v_nro  NUMBER := 0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO.sd_aux_log_errores.id_log%type;
BEGIN
IF p_id_familiar IS NULL OR p_nombre IS NULL  OR p_parentesco IS NULL
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
    IF p_id_familiar = 0 THEN
       
        v_id_familiar := Q_SD_FAMILIARES.nextval;
        INSERT INTO SINDICATO.SD_FAMILIARES (id_familiar ,id_socio ,id_chofer ,nombre ,apellido_paterno ,apellido_materno ,ci ,expedido ,fecha_nac ,parentesco ,observacion ,fecha_reg ,id_usr, direccion, telefono )
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


DROP PROCEDURE SINDICATO.P_SD_ALTA_SD_HOJAS_CONTROL;

--
-- P_SD_ALTA_SD_HOJAS_CONTROL  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ALTA_SD_HOJAS_CONTROL(
p_id_movil SINDICATO.SD_HOJAS_CONTROL.ID_MOVIL%type,
p_id_parada SINDICATO.SD_HOJAS_CONTROL.ID_PARADA%type,
p_id_caja SINDICATO.SD_CAJAS.ID_CAJA%type,
p_observacion SINDICATO.SD_HOJAS_CONTROL.OBSERVACION%type,
p_fecha_compra SINDICATO.SD_HOJAS_CONTROL.FECHA_COMPRA%type,
p_fecha_uso SINDICATO.SD_HOJAS_CONTROL.FECHA_USO%type,
p_monto SINDICATO.SD_HOJAS_CONTROL.MONTO%type,
p_id_usr NUMBER,
p_res OUT VARCHAR2
)
IS
v_id_hoja SINDICATO.SD_HOJAS_CONTROL.ID_HOJA%type;
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO.sd_aux_log_errores.id_log%type;
BEGIN
IF p_id_movil IS NULL OR p_id_parada IS NULL OR p_fecha_compra IS NULL OR p_id_caja IS NULL
    THEN
    v_res := 'Faltan parametros.';
    END IF;
IF v_res='0' THEN
    SELECT COUNT(*) INTO v_cnt FROM     SD_HOJAS_CONTROL WHERE ID_MOVIL = p_id_movil AND FECHA_USO = p_fecha_uso;
    IF v_cnt > 0 THEN
        v_res := 'Ya Compro Hoja para esa Fehca : '||p_fecha_uso;
    END IF;

    IF v_res = '0' THEN 
    v_id_hoja := Q_SD_HOJAS_CONTROL.nextval;
    INSERT INTO SINDICATO.SD_HOJAS_CONTROL (id_hoja ,nro_hoja ,id_movil ,id_parada ,observacion ,fecha_compra ,fecha_uso ,monto ,estado ,id_usuario ,fecha_reg )
    VALUES(v_id_hoja ,v_id_hoja ,p_id_movil ,p_id_parada ,p_observacion ,p_fecha_compra ,p_fecha_uso ,p_monto ,'ACTIVO' ,p_id_usr ,sysdate );
    
    
    INSERT INTO SD_KARDEX_EFECTIVO ( ID_KARDEX, ID_CAJA, ID_OPERACION ,OPERACION ,FECHA ,DETALLE, INGRESO, EGRESO ,SALDO, ID_USUARIO ,FECHA_REG )
             VALUES (Q_SD_KARDEX_EFECTIVO.nextval , p_id_caja , v_id_hoja , 'VENTA HOJA' ,p_fecha_compra ,'VENTA_HOJA- Nro Hoja :'||v_id_hoja,p_monto,0,0,p_id_usr,sysdate );
    v_res := '0';
    END IF;
END IF;
if v_res = '0' THEN
        v_res := '1';
     COMMIT;
      P_SD_ACT_KARDEX_EFECTIVO(p_id_caja, p_fecha_compra ,p_id_usr,v_res);

    ELSE
        ROLLBACK;
        
    END IF;
    p_res := v_res;
    p_res := v_res;
EXCEPTION
WHEN OTHERS THEN
ROLLBACK;
v_errC:=substr(sqlcode,1,20);
v_errD:=substr(sqlerrm,1,200);
p_grabar_error_bd(v_errC,v_errD,'P_SD_ALTA_SD_HOJAS_CONTROL','P_SD_ALTA_SD_HOJAS_CONTROL','-','-',v_id_log);
p_res :='ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/


DROP PROCEDURE SINDICATO.P_SD_ALTA_SD_SOCIOS;

--
-- P_SD_ALTA_SD_SOCIOS  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ALTA_SD_SOCIOS(
p_id_socio SINDICATO.SD_SOCIOS.ID_SOCIO%type,
p_nombre SINDICATO.SD_SOCIOS.NOMBRE%type,
p_apellido_paterno SINDICATO.SD_SOCIOS.APELLIDO_PATERNO%type,
p_apellido_materno SINDICATO.SD_SOCIOS.APELLIDO_MATERNO%type,
p_nro_licencia SINDICATO.SD_SOCIOS.NRO_LICENCIA%type,
p_categoria_lic SINDICATO.SD_SOCIOS.CATEGORIA_LIC%type,
p_ci SINDICATO.SD_SOCIOS.CI%type,
p_expedido SINDICATO.SD_SOCIOS.EXPEDIDO%type,
p_fecha_nac SINDICATO.SD_SOCIOS.FECHA_NAC%type,
p_fecha_ingreso SINDICATO.SD_SOCIOS.FECHA_INGRESO%type,
p_domicilio SINDICATO.SD_SOCIOS.DOMICILIO%type,
p_observacion SINDICATO.SD_SOCIOS.OBSERVACION%type,
p_telefono SINDICATO.SD_SOCIOS.TELEFONO%type,
p_celular SINDICATO.SD_SOCIOS.CELULAR%type,
p_estado_civil SINDICATO.SD_SOCIOS.ESTADO_CIVIL%type,
p_id_usr NUMBER,
p_res OUT VARCHAR2
)
IS
v_id_socio SINDICATO.SD_SOCIOS.ID_SOCIO%type;
v_nro SINDICATO.SD_SOCIOS.NRO_SOCIO%type;
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES .cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO.SD_AUX_LOG_ERRORES.id_log%type;
BEGIN
IF p_id_socio  IS NULL OR p_nombre IS NULL OR p_apellido_paterno IS NULL OR p_apellido_materno IS NULL OR p_ci IS NULL OR p_expedido IS NULL OR p_fecha_nac IS NULL OR p_fecha_ingreso IS NULL OR p_domicilio IS NULL OR p_observacion IS NULL OR p_estado_civil IS NULL
THEN
v_res := 'Faltan parametros.';
END IF;
IF p_id_socio = 0 THEN
    IF v_res='0' THEN
            SELECT COUNT(*) into v_cnt FROM   SD_SOCIOS WHERE CI = p_ci ;
            IF v_cnt > 0 THEN
                    v_res := 'No puede usar ese CI. ya esta siendo utilizando por otra persona.';
            END IF;
            IF v_res='0' THEN
               v_id_socio := Q_SD_SOCIOS.nextval;
              
                INSERT INTO SINDICATO.SD_SOCIOS (id_socio  , NRO_SOCIO , nombre ,apellido_paterno ,apellido_materno ,nro_licencia ,categoria_lic ,ci ,expedido ,fecha_nac ,fecha_ingreso ,fecha_baja ,domicilio ,observacion ,estado_civil ,fecha_reg ,id_usr ,estado ,telefono , celular)
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


DROP PROCEDURE SINDICATO.P_SD_CAMBIO_GARANTE;

--
-- P_SD_CAMBIO_GARANTE  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_CAMBIO_GARANTE(
p_id_chofer SINDICATO.SD_GARANTES .ID_CHOFER%type,
p_fecha_ini SINDICATO.SD_GARANTES.FECHA_INI %type,
p_observacion SINDICATO.SD_GARANTES.OBSERVACION%type,
p_id_socio SINDICATO.SD_GARANTES.ID_SOCIO%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO.sd_aux_log_errores.id_log%type;
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
            INSERT INTO SINDICATO.SD_GARANTES  (ID_GARANTE, ID_CHOFER ,ID_SOCIO ,OBSERVACION ,FECHA_INI,  FECHA_REG ,ESTADO, LOGIN  )
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


DROP PROCEDURE SINDICATO.P_SD_CREAR_OBLIGACIONES;

--
-- P_SD_CREAR_OBLIGACIONES  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_CREAR_OBLIGACIONES(
p_id_socio SINDICATO.SD_OBLIGACIONES_SOCIO.ID_SOCIO%type,
p_fecha SINDICATO.SD_KARDEX_OBLIGACION.FECHA %type,
p_motivo SINDICATO.SD_KARDEX_OBLIGACION.MOTIVO%type,
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO.sd_aux_log_errores.id_log%type;
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


DROP PROCEDURE SINDICATO.P_SD_ELIMINAR_CAJA;

--
-- P_SD_ELIMINAR_CAJA  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_ELIMINAR_CAJA(
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


DROP PROCEDURE SINDICATO.P_SD_GRABAR_HIST_EDICION_DATOS;

--
-- P_SD_GRABAR_HIST_EDICION_DATOS  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_GRABAR_HIST_EDICION_DATOS(
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


DROP PROCEDURE SINDICATO.P_SD_GRABAR_LISTAS_ITEMS;

--
-- P_SD_GRABAR_LISTAS_ITEMS  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_GRABAR_LISTAS_ITEMS(
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


DROP PROCEDURE SINDICATO.P_SD_GRABAR_SOCIO_MOVILES;

--
-- P_SD_GRABAR_SOCIO_MOVILES  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_GRABAR_SOCIO_MOVILES(
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
v_id_log SINDICATO.sd_aux_log_errores.id_log%type;
 v_id       NUMBER := 0;
BEGIN
  -- Validamos nulos
  IF p_id_socio_movil IS NULL OR p_id_socio IS NULL OR p_id_movil IS NULL OR p_fecha_alta IS NULL   OR p_tipo_movil IS NULL THEN
    v_res := 'Faltan parametros.';
  END IF;
   IF p_id_socio_movil = 0 THEN
      
        v_id := Q_SD_SOCIO_MOVILES.nextval;
         INSERT INTO SINDICATO.SD_SOCIO_MOVILES (id_socio_movil ,id_socio ,id_movil ,descripcion ,tipo_movil ,fecha_alta ,fecha_baja ,observacion ,fecha_reg ,id_usr ,estado )
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


DROP PROCEDURE SINDICATO.P_SD_GUARDAR_CAJAS;

--
-- P_SD_GUARDAR_CAJAS  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_GUARDAR_CAJAS(
p_id_caja SD_CAJAS.ID_CAJA %type,
p_codigo SD_CAJAS.CODIGO%type,
p_nombre  SD_CAJAS.NOMBRE  %type,
p_nro_cuenta SD_CAJAS.NRO_CUENTA  %type,
p_descripcion SD_CAJAS.DESCRIPCION   %type,
p_saldo SD_CAJAS.SALDO   %type,
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
       
        INSERT INTO SD_CAJAS  VALUES  (v_id_caja,p_codigo , p_nombre, p_nro_cuenta
         ,p_descripcion ,p_saldo ,p_login, v_fecha );
        
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
        UPDATE SD_CAJAS SET CODIGO = p_CODIGO ,NOMBRE =p_NOMBRE , NRO_CUENTA = p_NRO_CUENTA , DESCRIPCION = p_DESCRIPCION ,SALDO = p_SALDO  
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


DROP PROCEDURE SINDICATO.P_SD_GUARDAR_FE;

--
-- P_SD_GUARDAR_FE  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_GUARDAR_FE(
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


DROP PROCEDURE SINDICATO.P_SD_GUARDAR_FONDO_EMER;

--
-- P_SD_GUARDAR_FONDO_EMER  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_GUARDAR_FONDO_EMER(
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


DROP PROCEDURE SINDICATO.P_SD_GUARDAR_VENTA_HOJAS;

--
-- P_SD_GUARDAR_VENTA_HOJAS  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_SD_GUARDAR_VENTA_HOJAS(
p_id_venta SD_VENTA_HOJAS_CONTROL.ID_VENTA%type,
p_id_parada SD_VENTA_HOJAS_CONTROL.ID_PARADA%type,
p_nro_movil SD_VENTA_HOJAS_CONTROL.NRO_MOVIL%type,
p_id_socio SD_VENTA_HOJAS_CONTROL.ID_SOCIO%type,
p_fecha_compra  SD_VENTA_HOJAS_CONTROL.FECHA_COMPRA%type,
p_total SD_VENTA_HOJAS_CONTROL.TOTAL%type,
p_descuento SD_VENTA_HOJAS_CONTROL.DESCUENTO%type,
p_total_hojas SD_VENTA_HOJAS_CONTROL.TOTAL_HOJAS%type,
p_observacion SD_VENTA_HOJAS_CONTROL.OBSERVACION%type,
p_login   VARCHAR2,
--el resultado si es ok toda la operacion '1' y si no te devolvera el mensaje del error
p_res OUT VARCHAR2
)
IS
 v_cnt NUMBER:=0;
 v_res VARCHAR2(1000):='0';
 v_errC SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SD_AUX_LOG_ERRORES.id_log%type;
 v_id_venta NUMBER :=0;
 
BEGIN

IF p_id_venta IS NULL OR p_id_parada IS NULL OR p_nro_movil  IS NULL OR p_id_socio IS NULL  OR p_fecha_compra IS NULL  OR p_total IS NULL  OR p_total_hojas IS NULL
THEN
    v_res := 'Faltan parametros.';
END IF;
IF v_res='0' THEN
--vamos a crear nuestra secuencia
   if p_id_venta = 0 THEN
         --creacion
        v_id_venta := Q_SD_VENTA_HOJAS_CONTROL.nextval;
        IF v_res='0' THEN
        
            INSERT INTO SD_VENTA_HOJAS_CONTROL (ID_VENTA ,ID_PARADA ,NRO_MOVIL, ID_SOCIO ,OBSERVACION ,FECHA_COMPRA ,TOTAL, DESCUENTO ,TOTAL_HOJAS ,ESTADO ,LOGIN ,FECHA_REG )
            VALUES ( v_id_venta , p_id_parada , p_nro_movil ,
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


DROP PROCEDURE SINDICATO.P_ACT_OBLIGACIONES_SOCIO;

--
-- P_ACT_OBLIGACIONES_SOCIO  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_ACT_OBLIGACIONES_SOCIO(
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO.sd_aux_log_errores.id_log%type;
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


DROP PROCEDURE SINDICATO.P_AUX_REINICIAR_SECUENCIA;

--
-- P_AUX_REINICIAR_SECUENCIA  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.P_AUX_REINICIAR_SECUENCIA(
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


DROP PROCEDURE SINDICATO.P_EE_SECUENCIA;

--
-- P_EE_SECUENCIA  (Procedure) 
--
CREATE OR REPLACE PROCEDURE SINDICATO.p_ee_secuencia( p_cod_tabla varchar2, 
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
 v_errC   SINDICATO.SD_AUX_LOG_ERRORES.cod_error%type;
 v_errD   SINDICATO.SD_AUX_LOG_ERRORES.desc_error%type;
 v_id_log SINDICATO.SD_AUX_LOG_ERRORES.id_log%type;
BEGIN
  --  v_tabla :=   p_cod_tabla;
  
  -- Obtenemos el correlativo de movimientos desde un SEQUENCE
  v_sql := 'SELECT sindicato.q_' || trim(p_cod_tabla) || '.nextval FROM dual';
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
DROP SEQUENCE SINDICATO.Q_SD_AMORTIZACIONES;

--
-- Q_SD_AMORTIZACIONES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_AMORTIZACIONES
  START WITH 4
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_ANTECEDENTES;

--
-- Q_SD_ANTECEDENTES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_ANTECEDENTES
  START WITH 11
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_AUTOS;

--
-- Q_SD_AUTOS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_AUTOS
  START WITH 14
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_AUX_LOG_ERRORES;

--
-- Q_SD_AUX_LOG_ERRORES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_AUX_LOG_ERRORES
  START WITH 95
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_CAJAS;

--
-- Q_SD_CAJAS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_CAJAS
  START WITH 10
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_CHOFERES;

--
-- Q_SD_CHOFERES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_CHOFERES
  START WITH 304
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_CIERRES;

--
-- Q_SD_CIERRES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_CIERRES
  START WITH 6
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_CIERRES_PARADA;

--
-- Q_SD_CIERRES_PARADA  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_CIERRES_PARADA
  START WITH 12
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_DESCUENTOS;

--
-- Q_SD_DESCUENTOS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_DESCUENTOS
  START WITH 21
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_DESCUENTOS_SOCIO;

--
-- Q_SD_DESCUENTOS_SOCIO  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_DESCUENTOS_SOCIO
  START WITH 5646
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_DETALLE_CIERRE_PARADA;

--
-- Q_SD_DETALLE_CIERRE_PARADA  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_DETALLE_CIERRE_PARADA
  START WITH 9
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_DETALLE_HOJAS;

--
-- Q_SD_DETALLE_HOJAS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_DETALLE_HOJAS
  START WITH 57
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_DETALLE_PERIODO_SOCIO;

--
-- Q_SD_DETALLE_PERIODO_SOCIO  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_DETALLE_PERIODO_SOCIO
  START WITH 1315
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_DOCUMENTACIONES;

--
-- Q_SD_DOCUMENTACIONES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_DOCUMENTACIONES
  START WITH 8
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_EGRESOS;

--
-- Q_SD_EGRESOS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_EGRESOS
  START WITH 5
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_FAMILIARES;

--
-- Q_SD_FAMILIARES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_FAMILIARES
  START WITH 11
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_GARANTES;

--
-- Q_SD_GARANTES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_GARANTES
  START WITH 10
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_HIST_EDICION_DATOS;

--
-- Q_SD_HIST_EDICION_DATOS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_HIST_EDICION_DATOS
  START WITH 137
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_HOJAS_CONTROL;

--
-- Q_SD_HOJAS_CONTROL  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_HOJAS_CONTROL
  START WITH 79
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_INGRESOS;

--
-- Q_SD_INGRESOS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_INGRESOS
  START WITH 15
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_INGRESOS_SOCIO;

--
-- Q_SD_INGRESOS_SOCIO  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_INGRESOS_SOCIO
  START WITH 12
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_KARDEX_EFECTIVO;

--
-- Q_SD_KARDEX_EFECTIVO  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_KARDEX_EFECTIVO
  START WITH 144
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_KARDEX_FM;

--
-- Q_SD_KARDEX_FM  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_KARDEX_FM
  START WITH 38
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_KARDEX_OBLIGACION;

--
-- Q_SD_KARDEX_OBLIGACION  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_KARDEX_OBLIGACION
  START WITH 988
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_KARDEX_SOCIO;

--
-- Q_SD_KARDEX_SOCIO  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_KARDEX_SOCIO
  START WITH 20
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_KARDEX_SOCIO_DEBE;

--
-- Q_SD_KARDEX_SOCIO_DEBE  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_KARDEX_SOCIO_DEBE
  START WITH 4
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_LISTAS;

--
-- Q_SD_LISTAS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_LISTAS
  START WITH 17
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_LISTAS_ITEMS;

--
-- Q_SD_LISTAS_ITEMS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_LISTAS_ITEMS
  START WITH 70
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_MOVILES;

--
-- Q_SD_MOVILES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_MOVILES
  START WITH 376
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_OBLIGACIONES_SOCIO;

--
-- Q_SD_OBLIGACIONES_SOCIO  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_OBLIGACIONES_SOCIO
  START WITH 982
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_OTRAS_OBLIGACIONES;

--
-- Q_SD_OTRAS_OBLIGACIONES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_OTRAS_OBLIGACIONES
  START WITH 5
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_RETIRO_SOCIO;

--
-- Q_SD_RETIRO_SOCIO  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_RETIRO_SOCIO
  START WITH 9
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_SOCIOS;

--
-- Q_SD_SOCIOS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_SOCIOS
  START WITH 389
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_SOCIO_DESEMPENOS;

--
-- Q_SD_SOCIO_DESEMPENOS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_SOCIO_DESEMPENOS
  START WITH 4
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_SOCIO_MOVILES;

--
-- Q_SD_SOCIO_MOVILES  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_SOCIO_MOVILES
  START WITH 377
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_SOCIO_MOVIL_AUTOS;

--
-- Q_SD_SOCIO_MOVIL_AUTOS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_SOCIO_MOVIL_AUTOS
  START WITH 9
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_TRANSFERENCIAS;

--
-- Q_SD_TRANSFERENCIAS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_TRANSFERENCIAS
  START WITH 5
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_VENTA_HOJAS;

--
-- Q_SD_VENTA_HOJAS  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_VENTA_HOJAS
  START WITH 14
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;


DROP SEQUENCE SINDICATO.Q_SD_VENTA_HOJAS_CONTROL;

--
-- Q_SD_VENTA_HOJAS_CONTROL  (Sequence) 
--
CREATE SEQUENCE SINDICATO.Q_SD_VENTA_HOJAS_CONTROL
  START WITH 1
  MAXVALUE 9999999999999999999999999999
  MINVALUE 0
  NOCYCLE
  NOCACHE
  NOORDER;
ALTER TABLE SINDICATO.SD_AUTOS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_AUTOS CASCADE CONSTRAINTS;

--
-- SD_AUTOS  (Table) 
--
CREATE TABLE SINDICATO.SD_AUTOS
(
  ID_AUTO      NUMBER(7)                        NOT NULL,
  TIPO         VARCHAR2(50 BYTE)                NOT NULL,
  COLOR        VARCHAR2(50 BYTE)                NOT NULL,
  MARCA        VARCHAR2(50 BYTE),
  MODELO       VARCHAR2(50 BYTE),
  PLACA        VARCHAR2(50 BYTE)                NOT NULL,
  MOTOR        VARCHAR2(50 BYTE),
  CHASIS       VARCHAR2(50 BYTE),
  DESCRIPCION  VARCHAR2(200 BYTE),
  FECHA_ALTA   DATE                             NOT NULL,
  FECHA_BAJA   DATE,
  FECHA_REG    DATE,
  LOGIN_USR    VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_AUX_LOG_ERRORES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_AUX_LOG_ERRORES CASCADE CONSTRAINTS;

--
-- SD_AUX_LOG_ERRORES  (Table) 
--
CREATE TABLE SINDICATO.SD_AUX_LOG_ERRORES
(
  ID_LOG      NUMBER(12),
  LOGIN_USR   VARCHAR2(20 BYTE),
  FECHA       DATE,
  MODULO      VARCHAR2(100 BYTE),
  NOMBRE_SP   VARCHAR2(50 BYTE),
  COD_ERROR   VARCHAR2(50 BYTE),
  DESC_ERROR  VARCHAR2(200 BYTE),
  CAD_SQL     VARCHAR2(1000 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_CAJAS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_CAJAS CASCADE CONSTRAINTS;

--
-- SD_CAJAS  (Table) 
--
CREATE TABLE SINDICATO.SD_CAJAS
(
  ID_CAJA      NUMBER(7)                        NOT NULL,
  CODIGO       VARCHAR2(40 BYTE)                NOT NULL,
  NOMBRE       VARCHAR2(40 BYTE)                NOT NULL,
  NRO_CUENTA   VARCHAR2(40 BYTE),
  DESCRIPCION  VARCHAR2(150 BYTE)               NOT NULL,
  SALDO        NUMBER(15,5)                     NOT NULL,
  LOGIN        VARCHAR2(40 BYTE)                NOT NULL,
  FECHA_REG    DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


DROP TABLE SINDICATO.SD_CHOFERES_X CASCADE CONSTRAINTS;

--
-- SD_CHOFERES_X  (Table) 
--
CREATE TABLE SINDICATO.SD_CHOFERES_X
(
  ID_CHOFER         NUMBER(7)                   NOT NULL,
  NRO_CHOFER        NUMBER(7)                   NOT NULL,
  NOMBRE            VARCHAR2(200 BYTE)          NOT NULL,
  APELLIDO_PATERNO  VARCHAR2(200 BYTE)          NOT NULL,
  APELLIDO_MATERNO  VARCHAR2(200 BYTE)          NOT NULL,
  NRO_LICENCIA      NUMBER(15),
  CATEGORIA_LIC     VARCHAR2(50 BYTE),
  CI                NUMBER(15)                  NOT NULL,
  EXPEDIDO          VARCHAR2(10 BYTE)           NOT NULL,
  FECHA_NAC         DATE                        NOT NULL,
  FECHA_INGRESO     DATE                        NOT NULL,
  FECHA_BAJA        DATE,
  DOMICILIO         VARCHAR2(500 BYTE)          NOT NULL,
  OBSERVACION       VARCHAR2(500 BYTE)          NOT NULL,
  ESTADO_CIVIL      VARCHAR2(50 BYTE)           NOT NULL,
  ID_SOCIO          NUMBER(7)                   NOT NULL,
  FECHA_REG         DATE,
  ID_USR            NUMBER(7),
  ESTADO            VARCHAR2(20 BYTE),
  TELEFONO          VARCHAR2(50 BYTE),
  CELULAR           VARCHAR2(50 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_CIERRES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_CIERRES CASCADE CONSTRAINTS;

--
-- SD_CIERRES  (Table) 
--
CREATE TABLE SINDICATO.SD_CIERRES
(
  ID_CIERRE    NUMBER(7)                        NOT NULL,
  CODIGO       VARCHAR2(50 BYTE)                NOT NULL,
  FECHA_INI    DATE                             NOT NULL,
  FECHA_FIN    DATE                             NOT NULL,
  OBSERVACION  VARCHAR2(500 BYTE),
  FECHA_REG    DATE,
  LOGIN        VARCHAR2(20 BYTE),
  ESTADO       VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_DESCUENTOS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_DESCUENTOS CASCADE CONSTRAINTS;

--
-- SD_DESCUENTOS  (Table) 
--
CREATE TABLE SINDICATO.SD_DESCUENTOS
(
  ID_DESCUENTO      NUMBER(7)                   NOT NULL,
  ID_CIERRE         NUMBER(7)                   NOT NULL,
  DESCUENTO         VARCHAR2(150 BYTE)          NOT NULL,
  DESCRIPCION       VARCHAR2(500 BYTE),
  FECHA             DATE                        NOT NULL,
  TOTAL             NUMBER(15,5)                NOT NULL,
  FECHA_REG         DATE,
  ESTADO            VARCHAR2(20 BYTE)           NOT NULL,
  LOGIN             VARCHAR2(20 BYTE),
  OBSERV_APROBOADO  VARCHAR2(1500 BYTE),
  LOGIN_APROBADO    VARCHAR2(50 BYTE),
  ID_CAJA           NUMBER(7),
  OBSERV_DEBITO     VARCHAR2(1500 BYTE),
  LOGIN_DEBITO      VARCHAR2(50 BYTE),
  FECHA_APROBADO    DATE,
  FECHA_DEBITO      DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_EGRESOS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_EGRESOS CASCADE CONSTRAINTS;

--
-- SD_EGRESOS  (Table) 
--
CREATE TABLE SINDICATO.SD_EGRESOS
(
  ID_EGRESO    NUMBER(7)                        NOT NULL,
  ID_CAJA      NUMBER(7)                        NOT NULL,
  NRO_RECIBO   NUMBER(7)                        NOT NULL,
  FECHA        DATE                             NOT NULL,
  CONCEPTO     VARCHAR2(140 BYTE)               NOT NULL,
  OBSERVACION  VARCHAR2(1500 BYTE),
  IMPORTE      NUMBER(15,5)                     NOT NULL,
  LOGIN        VARCHAR2(50 BYTE),
  FECHA_REG    DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_FONDO_EMERGENCIAS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_FONDO_EMERGENCIAS CASCADE CONSTRAINTS;

--
-- SD_FONDO_EMERGENCIAS  (Table) 
--
CREATE TABLE SINDICATO.SD_FONDO_EMERGENCIAS
(
  ID_FONDO          NUMBER(7)                   NOT NULL,
  FONDO_EMERGENCIA  NUMBER(10,2)                NOT NULL,
  FECHA_ALTA        DATE                        NOT NULL,
  FECHA_BAJA        DATE,
  OBSERVACION       VARCHAR2(500 BYTE),
  ESTADO            VARCHAR2(10 BYTE),
  FECHA_REG         DATE,
  LOGIN             VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_HIST_EDICION_DATOS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_HIST_EDICION_DATOS CASCADE CONSTRAINTS;

--
-- SD_HIST_EDICION_DATOS  (Table) 
--
CREATE TABLE SINDICATO.SD_HIST_EDICION_DATOS
(
  ID_HIST      NUMBER(12)                       NOT NULL,
  ID_TABLA     NUMBER(12)                       NOT NULL,
  TABLA        VARCHAR2(30 BYTE)                NOT NULL,
  CAMPO        VARCHAR2(30 BYTE)                NOT NULL,
  VALOR_NUEVO  VARCHAR2(255 BYTE)               NOT NULL,
  MOTIVO       VARCHAR2(20 BYTE),
  FECHA_REG    DATE                             NOT NULL,
  LOGIN_USR    VARCHAR2(20 BYTE)                NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_IMAGENES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_IMAGENES CASCADE CONSTRAINTS;

--
-- SD_IMAGENES  (Table) 
--
CREATE TABLE SINDICATO.SD_IMAGENES
(
  ID_IMG       NUMBER(7)                        NOT NULL,
  ID_TABLA     NUMBER(7)                        NOT NULL,
  TABLA        VARCHAR2(200 BYTE)               NOT NULL,
  NOMBRE_IMG   VARCHAR2(200 BYTE)               NOT NULL,
  EXTENSION    VARCHAR2(200 BYTE)               NOT NULL,
  DESCRIPCION  VARCHAR2(200 BYTE),
  TAMANO       NUMBER(15),
  IMAGEN       BLOB,
  FECHA_REG    DATE,
  ID_USR       NUMBER(7),
  ESTADO       VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
LOB (IMAGEN) STORE AS (
  ENABLE      STORAGE IN ROW
  CHUNK       8192
  RETENTION
  NOCACHE
  INDEX       (
        TABLESPACE USERS
        STORAGE    (
                    INITIAL          64K
                    NEXT             1M
                    MINEXTENTS       1
                    MAXEXTENTS       UNLIMITED
                    PCTINCREASE      0
                    BUFFER_POOL      DEFAULT
                   ))
      STORAGE    (
                  INITIAL          64K
                  NEXT             1M
                  MINEXTENTS       1
                  MAXEXTENTS       UNLIMITED
                  PCTINCREASE      0
                  BUFFER_POOL      DEFAULT
                 ))
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_INGRESOS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_INGRESOS CASCADE CONSTRAINTS;

--
-- SD_INGRESOS  (Table) 
--
CREATE TABLE SINDICATO.SD_INGRESOS
(
  ID_INGRESO   NUMBER(7)                        NOT NULL,
  ID_CAJA      NUMBER(7)                        NOT NULL,
  NRO_RECIBO   NUMBER(7)                        NOT NULL,
  FECHA        DATE                             NOT NULL,
  CONCEPTO     VARCHAR2(140 BYTE)               NOT NULL,
  OBSERVACION  VARCHAR2(1500 BYTE),
  IMPORTE      NUMBER(15,5)                     NOT NULL,
  LOGIN        VARCHAR2(50 BYTE),
  FECHA_REG    DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_KARDEX_EFECTIVO
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_KARDEX_EFECTIVO CASCADE CONSTRAINTS;

--
-- SD_KARDEX_EFECTIVO  (Table) 
--
CREATE TABLE SINDICATO.SD_KARDEX_EFECTIVO
(
  ID_KARDEX     NUMBER(7)                       NOT NULL,
  ID_CAJA       NUMBER(7)                       NOT NULL,
  ID_OPERACION  NUMBER(7)                       NOT NULL,
  OPERACION     VARCHAR2(250 BYTE)              NOT NULL,
  FECHA         DATE                            NOT NULL,
  DETALLE       VARCHAR2(250 BYTE)              NOT NULL,
  INGRESO       NUMBER(15,5)                    NOT NULL,
  EGRESO        NUMBER(15,5)                    NOT NULL,
  SALDO         NUMBER(15,5)                    NOT NULL,
  LOGIN         VARCHAR2(250 BYTE)              NOT NULL,
  FECHA_REG     DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_LINEAS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_LINEAS CASCADE CONSTRAINTS;

--
-- SD_LINEAS  (Table) 
--
CREATE TABLE SINDICATO.SD_LINEAS
(
  ID_LINEA          NUMBER(7)                   NOT NULL,
  NRO_LINEA         NUMBER(7)                   NOT NULL,
  DESCRIPCION       VARCHAR2(200 BYTE)          NOT NULL,
  FECHA_ALTA        DATE                        NOT NULL,
  FECHA_BAJA        DATE,
  OBSERVACION       VARCHAR2(500 BYTE)          NOT NULL,
  FECHA_REG         DATE,
  ID_USR            NUMBER(7),
  ESTADO            VARCHAR2(20 BYTE),
  CANT_MOVIL_SOCIO  NUMBER(7)                   NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_LISTAS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_LISTAS CASCADE CONSTRAINTS;

--
-- SD_LISTAS  (Table) 
--
CREATE TABLE SINDICATO.SD_LISTAS
(
  ID_LISTA     NUMBER(7)                        NOT NULL,
  LISTA        VARCHAR2(20 BYTE)                NOT NULL,
  DESCRIPCION  VARCHAR2(50 BYTE),
  TAM_LIMITE   NUMBER(5)                        NOT NULL,
  TIPO_VALOR   VARCHAR2(10 BYTE)                NOT NULL,
  MAYUS_MINUS  VARCHAR2(5 BYTE)                 NOT NULL,
  ESTADO       VARCHAR2(15 BYTE)                NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;

COMMENT ON TABLE SINDICATO.SD_LISTAS IS 'Tabla de parametros. Definicion de cabecera de listas de parametros predefinidos.';

COMMENT ON COLUMN SINDICATO.SD_LISTAS.ID_LISTA IS 'Identificador unico para cada registro';

COMMENT ON COLUMN SINDICATO.SD_LISTAS.LISTA IS 'Nombre del parametro de lista';

COMMENT ON COLUMN SINDICATO.SD_LISTAS.DESCRIPCION IS 'Descripcion del elemento';

COMMENT ON COLUMN SINDICATO.SD_LISTAS.TAM_LIMITE IS 'Cantidad de caracteres o digitos que puede contener';

COMMENT ON COLUMN SINDICATO.SD_LISTAS.TIPO_VALOR IS 'Tipo de valor que acepta (CADENA o NUMERICO)';

COMMENT ON COLUMN SINDICATO.SD_LISTAS.MAYUS_MINUS IS 'Indica si se aceptan solo mayusculas (MAYUS) o ambos (MINUS)';

COMMENT ON COLUMN SINDICATO.SD_LISTAS.ESTADO IS 'Estado en el que se encuentra el documento';


ALTER TABLE SINDICATO.SD_LISTAS_ITEMS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_LISTAS_ITEMS CASCADE CONSTRAINTS;

--
-- SD_LISTAS_ITEMS  (Table) 
--
CREATE TABLE SINDICATO.SD_LISTAS_ITEMS
(
  ID_TABLA  NUMBER(7)                           NOT NULL,
  ID_PADRE  NUMBER(7),
  ID_LISTA  NUMBER(7)                           NOT NULL,
  CODIGO    VARCHAR2(5 BYTE),
  VALOR     VARCHAR2(30 BYTE)                   NOT NULL,
  ESTADO    CHAR(1 BYTE)                        NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_MENU_OPCIONES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_MENU_OPCIONES CASCADE CONSTRAINTS;

--
-- SD_MENU_OPCIONES  (Table) 
--
CREATE TABLE SINDICATO.SD_MENU_OPCIONES
(
  ID_OPC    NUMBER(5)                           NOT NULL,
  OPCION    VARCHAR2(40 BYTE)                   NOT NULL,
  LINK      VARCHAR2(50 BYTE),
  TOOLTIP   VARCHAR2(50 BYTE),
  ICONO     VARCHAR2(50 BYTE),
  ESTILO    VARCHAR2(50 BYTE),
  ID_PADRE  NUMBER(5),
  ESTADO    CHAR(1 BYTE)                        NOT NULL,
  ORDEN     NUMBER                              NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_MOVILES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_MOVILES CASCADE CONSTRAINTS;

--
-- SD_MOVILES  (Table) 
--
CREATE TABLE SINDICATO.SD_MOVILES
(
  ID_MOVIL     NUMBER(7)                        NOT NULL,
  ID_LINEA     NUMBER(7)                        NOT NULL,
  NRO_MOVIL    NUMBER(7)                        NOT NULL,
  DESCRIPCION  VARCHAR2(200 BYTE),
  FECHA_ALTA   DATE                             NOT NULL,
  FECHA_BAJA   DATE,
  OBSERVACION  VARCHAR2(500 BYTE),
  FECHA_REG    DATE,
  ID_USR       NUMBER(7),
  ESTADO       VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_OBLIGACIONES_HOJA
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_OBLIGACIONES_HOJA CASCADE CONSTRAINTS;

--
-- SD_OBLIGACIONES_HOJA  (Table) 
--
CREATE TABLE SINDICATO.SD_OBLIGACIONES_HOJA
(
  ID_OBLIGACION    NUMBER(7)                    NOT NULL,
  ID_LINEA         NUMBER(7)                    NOT NULL,
  ID_CAJA          NUMBER(7)                    NOT NULL,
  OBLIGACION       VARCHAR2(250 BYTE)           NOT NULL,
  IMPORTE_DEFECTO  NUMBER(15,5)                 NOT NULL,
  FECHA_REG        DATE,
  LOGIN            VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_PARADAS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_PARADAS CASCADE CONSTRAINTS;

--
-- SD_PARADAS  (Table) 
--
CREATE TABLE SINDICATO.SD_PARADAS
(
  ID_PARADA     NUMBER(7)                       NOT NULL,
  ID_CAJA       NUMBER(7)                       NOT NULL,
  NOMBRE        VARCHAR2(50 BYTE)               NOT NULL,
  DIRECCION     VARCHAR2(250 BYTE)              NOT NULL,
  RESPONSABLE   VARCHAR2(250 BYTE)              NOT NULL,
  DESCRIPCION   VARCHAR2(1250 BYTE)             NOT NULL,
  FECHA_INICIO  DATE                            NOT NULL,
  FECHA_FIN     DATE,
  ESTADO        VARCHAR2(50 BYTE)               NOT NULL,
  ID_USUARIO    NUMBER(5)                       NOT NULL,
  FECHA_REG     DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_PARAMETROS_LINEA
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_PARAMETROS_LINEA CASCADE CONSTRAINTS;

--
-- SD_PARAMETROS_LINEA  (Table) 
--
CREATE TABLE SINDICATO.SD_PARAMETROS_LINEA
(
  ID_PARAMETRO  NUMBER(7)                       NOT NULL,
  CODIGO        VARCHAR2(40 BYTE)               NOT NULL,
  NOMBRE        VARCHAR2(50 BYTE)               NOT NULL,
  TIPO          VARCHAR2(50 BYTE)               NOT NULL,
  ID_LINEA      NUMBER(7)                       NOT NULL,
  MONTO         NUMBER(15,5)                    NOT NULL,
  FECHA_INICIO  DATE                            NOT NULL,
  FECHA_FIN     DATE,
  ESTADO        VARCHAR2(50 BYTE)               NOT NULL,
  ID_USUARIO    NUMBER(5)                       NOT NULL,
  FECHA_REG     DATE,
  ID_CAJA       NUMBER(3)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_PERFILES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_PERFILES CASCADE CONSTRAINTS;

--
-- SD_PERFILES  (Table) 
--
CREATE TABLE SINDICATO.SD_PERFILES
(
  ID_PERFIL    NUMBER(5)                        NOT NULL,
  NOMBRE       VARCHAR2(40 BYTE)                NOT NULL,
  DESCRIPCION  VARCHAR2(50 BYTE)                NOT NULL,
  ESTADO       CHAR(1 BYTE)                     NOT NULL,
  ID_PARADA    NUMBER(7)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;

COMMENT ON COLUMN SINDICATO.SD_PERFILES.NOMBRE IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_PERFILES.DESCRIPCION IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_PERFILES.ESTADO IS 'grid , lista';


ALTER TABLE SINDICATO.SD_PERFILES_OPCIONES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_PERFILES_OPCIONES CASCADE CONSTRAINTS;

--
-- SD_PERFILES_OPCIONES  (Table) 
--
CREATE TABLE SINDICATO.SD_PERFILES_OPCIONES
(
  ID_PRF_OPC  NUMBER(5)                         NOT NULL,
  ID_PERFIL   NUMBER(5)                         NOT NULL,
  ID_OPC      NUMBER(5)                         NOT NULL,
  ESTADO      CHAR(1 BYTE)                      NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_SOCIOS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_SOCIOS CASCADE CONSTRAINTS;

--
-- SD_SOCIOS  (Table) 
--
CREATE TABLE SINDICATO.SD_SOCIOS
(
  ID_SOCIO          NUMBER(7)                   NOT NULL,
  NRO_SOCIO         NUMBER(7)                   NOT NULL,
  NOMBRE            VARCHAR2(200 BYTE)          NOT NULL,
  APELLIDO_PATERNO  VARCHAR2(200 BYTE)          NOT NULL,
  APELLIDO_MATERNO  VARCHAR2(200 BYTE)          NOT NULL,
  NRO_LICENCIA      NUMBER(15),
  CATEGORIA_LIC     VARCHAR2(50 BYTE),
  CI                NUMBER(15)                  NOT NULL,
  EXPEDIDO          VARCHAR2(10 BYTE)           NOT NULL,
  FECHA_NAC         DATE                        NOT NULL,
  FECHA_INGRESO     DATE                        NOT NULL,
  FECHA_BAJA        DATE,
  DOMICILIO         VARCHAR2(500 BYTE)          NOT NULL,
  OBSERVACION       VARCHAR2(500 BYTE)          NOT NULL,
  ESTADO_CIVIL      VARCHAR2(50 BYTE)           NOT NULL,
  FECHA_REG         DATE,
  ID_USR            NUMBER(7),
  ESTADO            VARCHAR2(20 BYTE),
  TELEFONO          VARCHAR2(50 BYTE),
  CELULAR           VARCHAR2(50 BYTE),
  SALDO             NUMBER(15,5),
  DEUDA             NUMBER(15,5)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.NRO_SOCIO IS 'grid ';

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.NOMBRE IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.APELLIDO_PATERNO IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.APELLIDO_MATERNO IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.NRO_LICENCIA IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.CATEGORIA_LIC IS 'grid  , lista';

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.CI IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.EXPEDIDO IS 'grid ,  lista';

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.FECHA_NAC IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.DOMICILIO IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_SOCIOS.ESTADO_CIVIL IS 'grid , lista';


DROP TABLE SINDICATO.SD_SOCIOS_X CASCADE CONSTRAINTS;

--
-- SD_SOCIOS_X  (Table) 
--
CREATE TABLE SINDICATO.SD_SOCIOS_X
(
  ID_SOCIO          NUMBER(7)                   NOT NULL,
  NRO_SOCIO         NUMBER(7)                   NOT NULL,
  NOMBRE            VARCHAR2(200 BYTE)          NOT NULL,
  APELLIDO_PATERNO  VARCHAR2(200 BYTE)          NOT NULL,
  APELLIDO_MATERNO  VARCHAR2(200 BYTE)          NOT NULL,
  NRO_LICENCIA      NUMBER(15),
  CATEGORIA_LIC     VARCHAR2(50 BYTE),
  CI                NUMBER(15)                  NOT NULL,
  EXPEDIDO          VARCHAR2(10 BYTE)           NOT NULL,
  FECHA_NAC         DATE                        NOT NULL,
  FECHA_INGRESO     DATE                        NOT NULL,
  FECHA_BAJA        DATE,
  DOMICILIO         VARCHAR2(500 BYTE)          NOT NULL,
  OBSERVACION       VARCHAR2(500 BYTE)          NOT NULL,
  ESTADO_CIVIL      VARCHAR2(50 BYTE)           NOT NULL,
  FECHA_REG         DATE,
  ID_USR            NUMBER(7),
  ESTADO            VARCHAR2(20 BYTE),
  TELEFONO          VARCHAR2(50 BYTE),
  CELULAR           VARCHAR2(50 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_SOCIO_DESEMPENOS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_SOCIO_DESEMPENOS CASCADE CONSTRAINTS;

--
-- SD_SOCIO_DESEMPENOS  (Table) 
--
CREATE TABLE SINDICATO.SD_SOCIO_DESEMPENOS
(
  ID_DESEMPENO  NUMBER(7)                       NOT NULL,
  ID_SOCIO      NUMBER(7)                       NOT NULL,
  CARGO         VARCHAR2(50 BYTE)               NOT NULL,
  OBSERVACION   VARCHAR2(1500 BYTE),
  FECHA_DESDE   DATE                            NOT NULL,
  FECHA_HASTA   DATE,
  FECHA_REG     DATE,
  LOGIN         VARCHAR2(50 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;

COMMENT ON COLUMN SINDICATO.SD_SOCIO_DESEMPENOS.CARGO IS 'lista , grid';

COMMENT ON COLUMN SINDICATO.SD_SOCIO_DESEMPENOS.OBSERVACION IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_SOCIO_DESEMPENOS.FECHA_DESDE IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_SOCIO_DESEMPENOS.FECHA_HASTA IS 'grid';


ALTER TABLE SINDICATO.SD_SOCIO_MOVILES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_SOCIO_MOVILES CASCADE CONSTRAINTS;

--
-- SD_SOCIO_MOVILES  (Table) 
--
CREATE TABLE SINDICATO.SD_SOCIO_MOVILES
(
  ID_SOCIO_MOVIL  NUMBER(7)                     NOT NULL,
  ID_SOCIO        NUMBER(7)                     NOT NULL,
  ID_MOVIL        NUMBER(7)                     NOT NULL,
  DESCRIPCION     VARCHAR2(200 BYTE),
  TIPO_MOVIL      VARCHAR2(20 BYTE),
  FECHA_ALTA      DATE                          NOT NULL,
  FECHA_BAJA      DATE,
  OBSERVACION     VARCHAR2(500 BYTE),
  FECHA_REG       DATE,
  ID_USR          NUMBER(7),
  ESTADO          VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_SOCIO_MOVIL_AUTOS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_SOCIO_MOVIL_AUTOS CASCADE CONSTRAINTS;

--
-- SD_SOCIO_MOVIL_AUTOS  (Table) 
--
CREATE TABLE SINDICATO.SD_SOCIO_MOVIL_AUTOS
(
  ID_SOCIO_MOVIL_AUTO  NUMBER(7)                NOT NULL,
  ID_SOCIO_MOVIL       NUMBER(7)                NOT NULL,
  ID_AUTO              NUMBER(7)                NOT NULL,
  TIPO                 VARCHAR2(50 BYTE)        NOT NULL,
  MOTIVO_ALTA          VARCHAR2(200 BYTE)       NOT NULL,
  MOTIVO_BAJA          VARCHAR2(200 BYTE),
  FECHA_ALTA           DATE                     NOT NULL,
  FECHA_BAJA           DATE,
  FECHA_REG            DATE,
  LOGIN_ALTA           VARCHAR2(20 BYTE),
  LOGIN_BAJA           VARCHAR2(20 BYTE),
  ESTADO               VARCHAR2(10 BYTE)        NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_SOC_MOV_OBLIG
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_SOC_MOV_OBLIG CASCADE CONSTRAINTS;

--
-- SD_SOC_MOV_OBLIG  (Table) 
--
CREATE TABLE SINDICATO.SD_SOC_MOV_OBLIG
(
  ID_SOC_MOV_OBLIG  NUMBER(7)                   NOT NULL,
  ID_OBLIGACION     NUMBER(7)                   NOT NULL,
  ID_SOCIO_MOVIL    NUMBER(7)                   NOT NULL,
  IMPORTE           NUMBER(15,5)                NOT NULL,
  FECHA_REG         DATE,
  LOGIN             VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_TRANSFERENCIAS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_TRANSFERENCIAS CASCADE CONSTRAINTS;

--
-- SD_TRANSFERENCIAS  (Table) 
--
CREATE TABLE SINDICATO.SD_TRANSFERENCIAS
(
  ID_TRANSFERENCIA  NUMBER(7)                   NOT NULL,
  ID_CAJA_ORIGEN    NUMBER(7)                   NOT NULL,
  ID_CAJA_DESTINO   NUMBER(7)                   NOT NULL,
  NRO_RECIBO        NUMBER(7)                   NOT NULL,
  FECHA             DATE                        NOT NULL,
  CONCEPTO          VARCHAR2(140 BYTE)          NOT NULL,
  OBSERVACION       VARCHAR2(1500 BYTE),
  IMPORTE           NUMBER(15,5)                NOT NULL,
  LOGIN             VARCHAR2(50 BYTE),
  FECHA_REG         DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_USUARIOS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_USUARIOS CASCADE CONSTRAINTS;

--
-- SD_USUARIOS  (Table) 
--
CREATE TABLE SINDICATO.SD_USUARIOS
(
  ID_USUARIO  NUMBER(5)                         NOT NULL,
  LOGIN       VARCHAR2(15 BYTE)                 NOT NULL,
  NOMBRE      VARCHAR2(60 BYTE)                 NOT NULL,
  EMAIL       VARCHAR2(30 BYTE),
  FCH_ALTA    DATE                              NOT NULL,
  FCH_BAJA    DATE,
  ID_PERFIL   NUMBER(5)                         NOT NULL,
  ESTADO      CHAR(1 BYTE)                      NOT NULL,
  CONTRASENA  VARCHAR2(300 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_VENTA_HOJAS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_VENTA_HOJAS CASCADE CONSTRAINTS;

--
-- SD_VENTA_HOJAS  (Table) 
--
CREATE TABLE SINDICATO.SD_VENTA_HOJAS
(
  ID_VENTA        NUMBER(7)                     NOT NULL,
  ID_PARADA       NUMBER(7)                     NOT NULL,
  ID_SOCIO_MOVIL  NUMBER(7)                     NOT NULL,
  OBSERVACION     VARCHAR2(1250 BYTE),
  FECHA_VENTA     DATE                          NOT NULL,
  TOTAL           NUMBER(15,5),
  DESCUENTO       NUMBER(15,5),
  TOTAL_HOJAS     NUMBER(7),
  ESTADO          VARCHAR2(50 BYTE),
  LOGIN           VARCHAR2(20 BYTE),
  FECHA_REG       DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_VENTA_HOJAS_CONTROL
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_VENTA_HOJAS_CONTROL CASCADE CONSTRAINTS;

--
-- SD_VENTA_HOJAS_CONTROL  (Table) 
--
CREATE TABLE SINDICATO.SD_VENTA_HOJAS_CONTROL
(
  ID_VENTA     NUMBER(7)                        NOT NULL,
  ID_PARADA    NUMBER(7)                        NOT NULL,
  NRO_MOVIL    NUMBER(7)                        NOT NULL,
  ID_SOCIO     NUMBER(7)                        NOT NULL,
  OBSERVACION  VARCHAR2(1250 BYTE),
  FECHA_VENTA  DATE                             NOT NULL,
  TOTAL        NUMBER(15,5),
  DESCUENTO    NUMBER(15,5),
  TOTAL_HOJAS  NUMBER(7),
  ESTADO       VARCHAR2(50 BYTE),
  LOGIN        VARCHAR2(20 BYTE),
  FECHA_REG    DATE,
  ID_CAJA      NUMBER(7)                        NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


--
-- PK_SG_LISTAS  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.PK_SG_LISTAS ON SINDICATO.SD_LISTAS
(ID_LISTA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_AUTOS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_AUTOS_PK ON SINDICATO.SD_AUTOS
(ID_AUTO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_AUX_LOG_ERRORES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_AUX_LOG_ERRORES_PK ON SINDICATO.SD_AUX_LOG_ERRORES
(ID_LOG)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_CAJAS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_CAJAS_PK ON SINDICATO.SD_CAJAS
(ID_CAJA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_CIERRES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_CIERRES_PK ON SINDICATO.SD_CIERRES
(ID_CIERRE)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_DESCUENTOS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_DESCUENTOS_PK ON SINDICATO.SD_DESCUENTOS
(ID_DESCUENTO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_EGRESOS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_EGRESOS_PK ON SINDICATO.SD_EGRESOS
(ID_EGRESO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_FONDO_EMERGENCIAS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_FONDO_EMERGENCIAS_PK ON SINDICATO.SD_FONDO_EMERGENCIAS
(ID_FONDO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_HIST_EDICION_DATOS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_HIST_EDICION_DATOS_PK ON SINDICATO.SD_HIST_EDICION_DATOS
(ID_HIST)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_IMAGENES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_IMAGENES_PK ON SINDICATO.SD_IMAGENES
(ID_IMG)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_INGRESOS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_INGRESOS_PK ON SINDICATO.SD_INGRESOS
(ID_INGRESO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_KARDEX_EFECTIVO_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_KARDEX_EFECTIVO_PK ON SINDICATO.SD_KARDEX_EFECTIVO
(ID_KARDEX)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_LINEAS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_LINEAS_PK ON SINDICATO.SD_LINEAS
(ID_LINEA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_LISTAS_ITEMS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_LISTAS_ITEMS_PK ON SINDICATO.SD_LISTAS_ITEMS
(ID_TABLA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_MENU_OPCIONES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_MENU_OPCIONES_PK ON SINDICATO.SD_MENU_OPCIONES
(ID_OPC)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_MOVILES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_MOVILES_PK ON SINDICATO.SD_MOVILES
(ID_MOVIL)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_OBLIGACIONES_HOJA_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_OBLIGACIONES_HOJA_PK ON SINDICATO.SD_OBLIGACIONES_HOJA
(ID_OBLIGACION)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_PARADAS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_PARADAS_PK ON SINDICATO.SD_PARADAS
(ID_PARADA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_PARAMETROS_LINEA_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_PARAMETROS_LINEA_PK ON SINDICATO.SD_PARAMETROS_LINEA
(ID_PARAMETRO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_PERFILES_OPCIONES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_PERFILES_OPCIONES_PK ON SINDICATO.SD_PERFILES_OPCIONES
(ID_PRF_OPC)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_PERFILES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_PERFILES_PK ON SINDICATO.SD_PERFILES
(ID_PERFIL)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_SOCIOS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_SOCIOS_PK ON SINDICATO.SD_SOCIOS
(ID_SOCIO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_SOCIOS_U01  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_SOCIOS_U01 ON SINDICATO.SD_SOCIOS
(NRO_SOCIO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_SOCIO_DESEMPENOS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_SOCIO_DESEMPENOS_PK ON SINDICATO.SD_SOCIO_DESEMPENOS
(ID_DESEMPENO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_SOCIO_MOVILES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_SOCIO_MOVILES_PK ON SINDICATO.SD_SOCIO_MOVILES
(ID_SOCIO_MOVIL)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_SOCIO_MOVIL_AUTOS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_SOCIO_MOVIL_AUTOS_PK ON SINDICATO.SD_SOCIO_MOVIL_AUTOS
(ID_SOCIO_MOVIL_AUTO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_SOC_MOV_OBLIG_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_SOC_MOV_OBLIG_PK ON SINDICATO.SD_SOC_MOV_OBLIG
(ID_SOC_MOV_OBLIG)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_TRANSFERENCIAS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_TRANSFERENCIAS_PK ON SINDICATO.SD_TRANSFERENCIAS
(ID_TRANSFERENCIA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_USUARIOS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_USUARIOS_PK ON SINDICATO.SD_USUARIOS
(ID_USUARIO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_VENTA_HOJAS_CONTROL_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_VENTA_HOJAS_CONTROL_PK ON SINDICATO.SD_VENTA_HOJAS_CONTROL
(ID_VENTA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_VENTA_HOJAS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_VENTA_HOJAS_PK ON SINDICATO.SD_VENTA_HOJAS
(ID_VENTA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


ALTER TABLE SINDICATO.SD_AMORTIZACIONES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_AMORTIZACIONES CASCADE CONSTRAINTS;

--
-- SD_AMORTIZACIONES  (Table) 
--
CREATE TABLE SINDICATO.SD_AMORTIZACIONES
(
  ID_AMORTIZACION  NUMBER(7)                    NOT NULL,
  ID_SOCIO         NUMBER(7)                    NOT NULL,
  NRO_RECIBO       NUMBER(7)                    NOT NULL,
  CONCEPTO         VARCHAR2(140 BYTE)           NOT NULL,
  FECHA            DATE                         NOT NULL,
  OBSERVACION      VARCHAR2(1500 BYTE),
  IMPORTE          NUMBER(15,5)                 NOT NULL,
  LOGIN            VARCHAR2(50 BYTE),
  FECHA_REG        DATE,
  ID_CAJA          NUMBER(7)                    NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_CHOFERES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_CHOFERES CASCADE CONSTRAINTS;

--
-- SD_CHOFERES  (Table) 
--
CREATE TABLE SINDICATO.SD_CHOFERES
(
  ID_CHOFER         NUMBER(7)                   NOT NULL,
  NRO_CHOFER        NUMBER(7)                   NOT NULL,
  NOMBRE            VARCHAR2(200 BYTE)          NOT NULL,
  APELLIDO_PATERNO  VARCHAR2(200 BYTE)          NOT NULL,
  APELLIDO_MATERNO  VARCHAR2(200 BYTE)          NOT NULL,
  NRO_LICENCIA      NUMBER(15),
  CATEGORIA_LIC     VARCHAR2(50 BYTE),
  CI                NUMBER(15)                  NOT NULL,
  EXPEDIDO          VARCHAR2(10 BYTE)           NOT NULL,
  FECHA_NAC         DATE                        NOT NULL,
  FECHA_INGRESO     DATE                        NOT NULL,
  FECHA_BAJA        DATE,
  DOMICILIO         VARCHAR2(500 BYTE)          NOT NULL,
  OBSERVACION       VARCHAR2(500 BYTE)          NOT NULL,
  ESTADO_CIVIL      VARCHAR2(50 BYTE)           NOT NULL,
  ID_SOCIO          NUMBER(7)                   NOT NULL,
  FECHA_REG         DATE,
  ID_USR            NUMBER(7),
  ESTADO            VARCHAR2(20 BYTE),
  TELEFONO          VARCHAR2(50 BYTE),
  CELULAR           VARCHAR2(50 BYTE),
  FONDO_EMERGENCIA  NUMBER(10,2)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.NRO_CHOFER IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.NOMBRE IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.APELLIDO_PATERNO IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.APELLIDO_MATERNO IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.NRO_LICENCIA IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.CATEGORIA_LIC IS 'grid , lista';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.CI IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.EXPEDIDO IS 'grid  lista';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.FECHA_NAC IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.FECHA_INGRESO IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.DOMICILIO IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.OBSERVACION IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.ESTADO_CIVIL IS 'grid  lista';

COMMENT ON COLUMN SINDICATO.SD_CHOFERES.ID_SOCIO IS 'lista';


ALTER TABLE SINDICATO.SD_CIERRES_PARADA
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_CIERRES_PARADA CASCADE CONSTRAINTS;

--
-- SD_CIERRES_PARADA  (Table) 
--
CREATE TABLE SINDICATO.SD_CIERRES_PARADA
(
  ID_CIERRE      NUMBER(7)                      NOT NULL,
  ID_PARADA      NUMBER(7)                      NOT NULL,
  FECHA_INI      DATE                           NOT NULL,
  FECHA_FIN      DATE                           NOT NULL,
  OBSERVACION    VARCHAR2(500 BYTE),
  FECHA_REG      DATE,
  IMPORTE_TOTAL  NUMBER(15,5)                   NOT NULL,
  LOGIN          VARCHAR2(20 BYTE),
  ESTADO         VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_DEPOSITO_FE
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_DEPOSITO_FE CASCADE CONSTRAINTS;

--
-- SD_DEPOSITO_FE  (Table) 
--
CREATE TABLE SINDICATO.SD_DEPOSITO_FE
(
  ID_DEPOSITO  NUMBER(7)                        NOT NULL,
  ID_CHOFER    NUMBER(7)                        NOT NULL,
  NRO_RECIBO   NUMBER(7)                        NOT NULL,
  DEPOSITO     NUMBER(10,2)                     NOT NULL,
  FECHA        DATE,
  OBSERVACION  VARCHAR2(500 BYTE),
  FECHA_REG    DATE,
  ID_USR       NUMBER(7),
  LOGIN        VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_DESCUENTOS_SOCIO
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_DESCUENTOS_SOCIO CASCADE CONSTRAINTS;

--
-- SD_DESCUENTOS_SOCIO  (Table) 
--
CREATE TABLE SINDICATO.SD_DESCUENTOS_SOCIO
(
  ID_DESCUENTO_SOCIO  NUMBER(7)                 NOT NULL,
  ID_DESCUENTO        NUMBER(7)                 NOT NULL,
  ID_SOCIO            NUMBER(7)                 NOT NULL,
  DETALLE             VARCHAR2(150 BYTE),
  IMPORTE             NUMBER(15,5)              NOT NULL,
  LOGIN               VARCHAR2(50 BYTE)         NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_DETALLE_CIERRE_PARADA
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_DETALLE_CIERRE_PARADA CASCADE CONSTRAINTS;

--
-- SD_DETALLE_CIERRE_PARADA  (Table) 
--
CREATE TABLE SINDICATO.SD_DETALLE_CIERRE_PARADA
(
  ID_DETALLE  NUMBER(7)                         NOT NULL,
  ID_CIERRE   NUMBER(7)                         NOT NULL,
  DETALLE     VARCHAR2(500 BYTE),
  INGRESO     NUMBER(15,5)                      NOT NULL,
  EGRESO      NUMBER(15,5)                      NOT NULL
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_DETALLE_HOJAS
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_DETALLE_HOJAS CASCADE CONSTRAINTS;

--
-- SD_DETALLE_HOJAS  (Table) 
--
CREATE TABLE SINDICATO.SD_DETALLE_HOJAS
(
  ID_DETALLE   NUMBER(7)                        NOT NULL,
  ID_VENTA     NUMBER(7)                        NOT NULL,
  OBSERVACION  VARCHAR2(1250 BYTE),
  FECHA_USO    DATE                             NOT NULL,
  MONTO        NUMBER(15,5),
  LOGIN        VARCHAR2(20 BYTE),
  FECHA_REG    DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_DETALLE_PERIODO_SOCIO
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_DETALLE_PERIODO_SOCIO CASCADE CONSTRAINTS;

--
-- SD_DETALLE_PERIODO_SOCIO  (Table) 
--
CREATE TABLE SINDICATO.SD_DETALLE_PERIODO_SOCIO
(
  ID_DETALLE                NUMBER(7)           NOT NULL,
  ID_CIERRE                 NUMBER(7)           NOT NULL,
  ID_SOCIO                  NUMBER(7)           NOT NULL,
  INGRESOS_HOJAS            NUMBER(15,5),
  OTROS_INGRESOS            NUMBER(15,5),
  OBLIGACIONES_INSTITUCION  NUMBER(15,5),
  OTRAS_OBLIGACIONES        NUMBER(15,5),
  DESCUENTOS                NUMBER(15,5),
  AHORRO                    NUMBER(15,5),
  DEUDA                     NUMBER(15,5)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_DOCUMENTACIONES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_DOCUMENTACIONES CASCADE CONSTRAINTS;

--
-- SD_DOCUMENTACIONES  (Table) 
--
CREATE TABLE SINDICATO.SD_DOCUMENTACIONES
(
  ID_DOCUMENTACION  NUMBER(7)                   NOT NULL,
  ID_SOCIO          NUMBER(7),
  ID_CHOFER         NUMBER(7),
  DOCUMENTACION     VARCHAR2(50 BYTE)           NOT NULL,
  TIPO              VARCHAR2(50 BYTE),
  OBSERVACION       VARCHAR2(1500 BYTE),
  FECHA             DATE                        NOT NULL,
  FECHA_REG         DATE,
  LOGIN             VARCHAR2(50 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;

COMMENT ON COLUMN SINDICATO.SD_DOCUMENTACIONES.DOCUMENTACION IS 'grid , lista';

COMMENT ON COLUMN SINDICATO.SD_DOCUMENTACIONES.TIPO IS 'lista';

COMMENT ON COLUMN SINDICATO.SD_DOCUMENTACIONES.OBSERVACION IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_DOCUMENTACIONES.FECHA IS 'grid';


ALTER TABLE SINDICATO.SD_FAMILIARES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_FAMILIARES CASCADE CONSTRAINTS;

--
-- SD_FAMILIARES  (Table) 
--
CREATE TABLE SINDICATO.SD_FAMILIARES
(
  ID_FAMILIAR       NUMBER(7)                   NOT NULL,
  ID_SOCIO          NUMBER(7),
  ID_CHOFER         NUMBER(7),
  NOMBRE            VARCHAR2(200 BYTE)          NOT NULL,
  APELLIDO_PATERNO  VARCHAR2(200 BYTE),
  APELLIDO_MATERNO  VARCHAR2(200 BYTE),
  CI                NUMBER(15),
  EXPEDIDO          VARCHAR2(10 BYTE),
  FECHA_NAC         DATE,
  PARENTESCO        VARCHAR2(50 BYTE)           NOT NULL,
  OBSERVACION       VARCHAR2(500 BYTE),
  FECHA_REG         DATE,
  ID_USR            NUMBER(7),
  TELEFONO          VARCHAR2(50 BYTE),
  DIRECCION         VARCHAR2(250 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;

COMMENT ON COLUMN SINDICATO.SD_FAMILIARES.NOMBRE IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_FAMILIARES.CI IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_FAMILIARES.EXPEDIDO IS 'lista';

COMMENT ON COLUMN SINDICATO.SD_FAMILIARES.FECHA_NAC IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_FAMILIARES.PARENTESCO IS 'grid , lista';

COMMENT ON COLUMN SINDICATO.SD_FAMILIARES.OBSERVACION IS 'grid';


ALTER TABLE SINDICATO.SD_GARANTES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_GARANTES CASCADE CONSTRAINTS;

--
-- SD_GARANTES  (Table) 
--
CREATE TABLE SINDICATO.SD_GARANTES
(
  ID_GARANTE   NUMBER(7)                        NOT NULL,
  ID_CHOFER    NUMBER(7)                        NOT NULL,
  ID_SOCIO     NUMBER(7)                        NOT NULL,
  OBSERVACION  VARCHAR2(200 BYTE),
  FECHA_INI    DATE                             NOT NULL,
  FECHA_FIN    DATE,
  FECHA_REG    DATE,
  ESTADO       VARCHAR2(200 BYTE),
  LOGIN        VARCHAR2(20 BYTE),
  ID_USR       NUMBER(7)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_HOJAS_CONTROL
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_HOJAS_CONTROL CASCADE CONSTRAINTS;

--
-- SD_HOJAS_CONTROL  (Table) 
--
CREATE TABLE SINDICATO.SD_HOJAS_CONTROL
(
  ID_HOJA       NUMBER(7)                       NOT NULL,
  NRO_HOJA      NUMBER(7)                       NOT NULL,
  ID_MOVIL      NUMBER(7)                       NOT NULL,
  ID_PARADA     NUMBER(7)                       NOT NULL,
  OBSERVACION   VARCHAR2(1250 BYTE),
  FECHA_COMPRA  DATE                            NOT NULL,
  FECHA_USO     DATE,
  MONTO         NUMBER(15,5),
  ESTADO        VARCHAR2(50 BYTE),
  ID_USUARIO    NUMBER(5)                       NOT NULL,
  FECHA_REG     DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_HOJAS_LINEA
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_HOJAS_LINEA CASCADE CONSTRAINTS;

--
-- SD_HOJAS_LINEA  (Table) 
--
CREATE TABLE SINDICATO.SD_HOJAS_LINEA
(
  ID_HOJA      NUMBER(7)                        NOT NULL,
  ID_LINEA     NUMBER(7)                        NOT NULL,
  NOMBRE       VARCHAR2(255 BYTE)               NOT NULL,
  OBSERVACION  VARCHAR2(1250 BYTE),
  LOGIN        VARCHAR2(50 BYTE),
  FECHA_REG    DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_INGRESOS_SOCIO
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_INGRESOS_SOCIO CASCADE CONSTRAINTS;

--
-- SD_INGRESOS_SOCIO  (Table) 
--
CREATE TABLE SINDICATO.SD_INGRESOS_SOCIO
(
  ID_INGRESO   NUMBER(7)                        NOT NULL,
  ID_SOCIO     NUMBER(7)                        NOT NULL,
  NRO_RECIBO   NUMBER(7)                        NOT NULL,
  INGRESO      NUMBER(15,2)                     NOT NULL,
  FECHA        DATE,
  OBSERVACION  VARCHAR2(500 BYTE),
  FECHA_REG    DATE,
  LOGIN        VARCHAR2(20 BYTE),
  ESTADO       VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_KARDEX_FM
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_KARDEX_FM CASCADE CONSTRAINTS;

--
-- SD_KARDEX_FM  (Table) 
--
CREATE TABLE SINDICATO.SD_KARDEX_FM
(
  ID_KARDEX    NUMBER(7)                        NOT NULL,
  ID_CHOFER    NUMBER(7)                        NOT NULL,
  OPERACION    VARCHAR2(250 BYTE)               NOT NULL,
  FECHA        DATE                             NOT NULL,
  INGRESO      NUMBER(15,5)                     NOT NULL,
  EGRESO       NUMBER(15,5)                     NOT NULL,
  SALDO        NUMBER(15,5)                     NOT NULL,
  LOGIN        VARCHAR2(20 BYTE)                NOT NULL,
  FECHA_REG    DATE,
  NRO_CMP      NUMBER(15)                       NOT NULL,
  OBSERVACION  VARCHAR2(1000 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_KARDEX_SOCIO
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_KARDEX_SOCIO CASCADE CONSTRAINTS;

--
-- SD_KARDEX_SOCIO  (Table) 
--
CREATE TABLE SINDICATO.SD_KARDEX_SOCIO
(
  ID_KARDEX     NUMBER(7)                       NOT NULL,
  ID_SOCIO      NUMBER(7)                       NOT NULL,
  ID_OPERACION  NUMBER(7)                       NOT NULL,
  OPERACION     VARCHAR2(250 BYTE)              NOT NULL,
  FECHA         DATE                            NOT NULL,
  DETALLE       VARCHAR2(250 BYTE)              NOT NULL,
  INGRESO       NUMBER(15,5)                    NOT NULL,
  EGRESO        NUMBER(15,5)                    NOT NULL,
  SALDO         NUMBER(15,5)                    NOT NULL,
  LOGIN         VARCHAR2(250 BYTE)              NOT NULL,
  FECHA_REG     DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_KARDEX_SOCIO_DEBE
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_KARDEX_SOCIO_DEBE CASCADE CONSTRAINTS;

--
-- SD_KARDEX_SOCIO_DEBE  (Table) 
--
CREATE TABLE SINDICATO.SD_KARDEX_SOCIO_DEBE
(
  ID_KARDEX     NUMBER(7)                       NOT NULL,
  ID_SOCIO      NUMBER(7)                       NOT NULL,
  ID_OPERACION  NUMBER(7)                       NOT NULL,
  OPERACION     VARCHAR2(250 BYTE)              NOT NULL,
  FECHA         DATE                            NOT NULL,
  DETALLE       VARCHAR2(250 BYTE)              NOT NULL,
  DEBE          NUMBER(15,5)                    NOT NULL,
  AMORTIZACION  NUMBER(15,5)                    NOT NULL,
  SALDO_DEBE    NUMBER(15,5)                    NOT NULL,
  LOGIN         VARCHAR2(250 BYTE)              NOT NULL,
  FECHA_REG     DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_OBLIGACIONES_SOCIO
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_OBLIGACIONES_SOCIO CASCADE CONSTRAINTS;

--
-- SD_OBLIGACIONES_SOCIO  (Table) 
--
CREATE TABLE SINDICATO.SD_OBLIGACIONES_SOCIO
(
  ID_OBLIGACION  NUMBER(7)                      NOT NULL,
  ID_SOCIO       NUMBER(7)                      NOT NULL,
  OBLIGACION     VARCHAR2(250 BYTE)             NOT NULL,
  IMPORTE        NUMBER(15,5)                   NOT NULL,
  FECHA_REG      DATE,
  LOGIN          VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_OTRAS_OBLIGACIONES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_OTRAS_OBLIGACIONES CASCADE CONSTRAINTS;

--
-- SD_OTRAS_OBLIGACIONES  (Table) 
--
CREATE TABLE SINDICATO.SD_OTRAS_OBLIGACIONES
(
  ID_OBLIGACION  NUMBER(7)                      NOT NULL,
  ID_SOCIO       NUMBER(7)                      NOT NULL,
  ID_CIERRE      NUMBER(7)                      NOT NULL,
  FECHA          DATE                           NOT NULL,
  CONCEPTO       VARCHAR2(140 BYTE)             NOT NULL,
  OBSERVACION    VARCHAR2(1500 BYTE),
  IMPORTE        NUMBER(15,5)                   NOT NULL,
  LOGIN          VARCHAR2(50 BYTE),
  ESTADO         VARCHAR2(20 BYTE),
  FECHA_REG      DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_RETIRO_FE
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_RETIRO_FE CASCADE CONSTRAINTS;

--
-- SD_RETIRO_FE  (Table) 
--
CREATE TABLE SINDICATO.SD_RETIRO_FE
(
  ID_RETIRO    NUMBER(7)                        NOT NULL,
  ID_CHOFER    NUMBER(7)                        NOT NULL,
  NRO_RECIBO   NUMBER(7)                        NOT NULL,
  RETIRO       NUMBER(10,2)                     NOT NULL,
  FECHA        DATE,
  OBSERVACION  VARCHAR2(500 BYTE),
  FECHA_REG    DATE,
  ID_USR       NUMBER(7),
  LOGIN        VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


ALTER TABLE SINDICATO.SD_RETIRO_SOCIO
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_RETIRO_SOCIO CASCADE CONSTRAINTS;

--
-- SD_RETIRO_SOCIO  (Table) 
--
CREATE TABLE SINDICATO.SD_RETIRO_SOCIO
(
  ID_RETIRO    NUMBER(7)                        NOT NULL,
  ID_SOCIO     NUMBER(7)                        NOT NULL,
  NRO_RECIBO   NUMBER(7)                        NOT NULL,
  RETIRO       NUMBER(15,2)                     NOT NULL,
  FECHA        DATE,
  OBSERVACION  VARCHAR2(500 BYTE),
  FECHA_REG    DATE,
  LOGIN        VARCHAR2(20 BYTE),
  ESTADO       VARCHAR2(20 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


--
-- SD_AMORTIZACIONES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_AMORTIZACIONES_PK ON SINDICATO.SD_AMORTIZACIONES
(ID_AMORTIZACION)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_CHOFERES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_CHOFERES_PK ON SINDICATO.SD_CHOFERES
(ID_CHOFER)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_CIERRES_PARADA_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_CIERRES_PARADA_PK ON SINDICATO.SD_CIERRES_PARADA
(ID_CIERRE)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_DEPOSITO_FE_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_DEPOSITO_FE_PK ON SINDICATO.SD_DEPOSITO_FE
(ID_DEPOSITO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_DESCUENTOS_SOCIO_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_DESCUENTOS_SOCIO_PK ON SINDICATO.SD_DESCUENTOS_SOCIO
(ID_DESCUENTO_SOCIO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_DETALLE_CIERRE_PARADA_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_DETALLE_CIERRE_PARADA_PK ON SINDICATO.SD_DETALLE_CIERRE_PARADA
(ID_DETALLE)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_DETALLE_HOJAS_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_DETALLE_HOJAS_PK ON SINDICATO.SD_DETALLE_HOJAS
(ID_DETALLE)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_DETALLE_PERIODO_SOCIO_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_DETALLE_PERIODO_SOCIO_PK ON SINDICATO.SD_DETALLE_PERIODO_SOCIO
(ID_DETALLE)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_DOCUMENTACIONES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_DOCUMENTACIONES_PK ON SINDICATO.SD_DOCUMENTACIONES
(ID_DOCUMENTACION)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_FAMILIARES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_FAMILIARES_PK ON SINDICATO.SD_FAMILIARES
(ID_FAMILIAR)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_GARANTES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_GARANTES_PK ON SINDICATO.SD_GARANTES
(ID_GARANTE)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_HOJAS_CONTROL_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_HOJAS_CONTROL_PK ON SINDICATO.SD_HOJAS_CONTROL
(ID_HOJA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_HOJAS_LINEA_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_HOJAS_LINEA_PK ON SINDICATO.SD_HOJAS_LINEA
(ID_HOJA)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_INGRESOS_SOCIO_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_INGRESOS_SOCIO_PK ON SINDICATO.SD_INGRESOS_SOCIO
(ID_INGRESO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_KARDEX_FM_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_KARDEX_FM_PK ON SINDICATO.SD_KARDEX_FM
(ID_KARDEX)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_KARDEX_SOCIO_DEBE_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_KARDEX_SOCIO_DEBE_PK ON SINDICATO.SD_KARDEX_SOCIO_DEBE
(ID_KARDEX)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_KARDEX_SOCIO_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_KARDEX_SOCIO_PK ON SINDICATO.SD_KARDEX_SOCIO
(ID_KARDEX)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_OBLIGACIONES_SOCIO_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_OBLIGACIONES_SOCIO_PK ON SINDICATO.SD_OBLIGACIONES_SOCIO
(ID_OBLIGACION)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_OTRAS_OBLIGACIONES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_OTRAS_OBLIGACIONES_PK ON SINDICATO.SD_OTRAS_OBLIGACIONES
(ID_OBLIGACION)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_RETIRO_FE_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_RETIRO_FE_PK ON SINDICATO.SD_RETIRO_FE
(ID_RETIRO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_RETIRO_SOCIO_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_RETIRO_SOCIO_PK ON SINDICATO.SD_RETIRO_SOCIO
(ID_RETIRO)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


ALTER TABLE SINDICATO.SD_ANTECEDENTES
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_ANTECEDENTES CASCADE CONSTRAINTS;

--
-- SD_ANTECEDENTES  (Table) 
--
CREATE TABLE SINDICATO.SD_ANTECEDENTES
(
  ID_ANTECEDENTE  NUMBER(7)                     NOT NULL,
  ID_SOCIO        NUMBER(7),
  ID_CHOFER       NUMBER(7),
  MOTIVO          VARCHAR2(100 BYTE)            NOT NULL,
  OBSERVACION     VARCHAR2(1500 BYTE),
  FECHA           DATE                          NOT NULL,
  FECHA_REG       DATE,
  LOGIN           VARCHAR2(50 BYTE)
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;

COMMENT ON COLUMN SINDICATO.SD_ANTECEDENTES.MOTIVO IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_ANTECEDENTES.OBSERVACION IS 'grid';

COMMENT ON COLUMN SINDICATO.SD_ANTECEDENTES.FECHA IS 'grid';


ALTER TABLE SINDICATO.SD_KARDEX_OBLIGACION
 DROP PRIMARY KEY CASCADE;

DROP TABLE SINDICATO.SD_KARDEX_OBLIGACION CASCADE CONSTRAINTS;

--
-- SD_KARDEX_OBLIGACION  (Table) 
--
CREATE TABLE SINDICATO.SD_KARDEX_OBLIGACION
(
  ID_KARDEX         NUMBER(7)                   NOT NULL,
  ID_OBLIGACION     NUMBER(7)                   NOT NULL,
  MOTIVO            VARCHAR2(250 BYTE)          NOT NULL,
  FECHA             DATE                        NOT NULL,
  IMPORTE_ANTERIOR  NUMBER(15,5)                NOT NULL,
  IMPORTE_NUEVO     NUMBER(15,5)                NOT NULL,
  LOGIN             VARCHAR2(20 BYTE)           NOT NULL,
  FECHA_REG         DATE
)
TABLESPACE USERS
PCTUSED    0
PCTFREE    10
INITRANS   1
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
LOGGING 
NOCOMPRESS 
NOCACHE
NOPARALLEL
MONITORING;


--
-- SD_ANTECEDENTES_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_ANTECEDENTES_PK ON SINDICATO.SD_ANTECEDENTES
(ID_ANTECEDENTE)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


--
-- SD_KARDEX_OBLIGACION_PK  (Index) 
--
CREATE UNIQUE INDEX SINDICATO.SD_KARDEX_OBLIGACION_PK ON SINDICATO.SD_KARDEX_OBLIGACION
(ID_KARDEX)
LOGGING
TABLESPACE USERS
PCTFREE    10
INITRANS   2
MAXTRANS   255
STORAGE    (
            INITIAL          64K
            NEXT             1M
            MINEXTENTS       1
            MAXEXTENTS       UNLIMITED
            PCTINCREASE      0
            BUFFER_POOL      DEFAULT
           )
NOPARALLEL;


-- 
-- Non Foreign Key Constraints for Table SD_AUTOS 
-- 
ALTER TABLE SINDICATO.SD_AUTOS ADD (
  CONSTRAINT SD_AUTOS_PK
 PRIMARY KEY
 (ID_AUTO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_AUX_LOG_ERRORES 
-- 
ALTER TABLE SINDICATO.SD_AUX_LOG_ERRORES ADD (
  CONSTRAINT SD_AUX_LOG_ERRORES_PK
 PRIMARY KEY
 (ID_LOG)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_CAJAS 
-- 
ALTER TABLE SINDICATO.SD_CAJAS ADD (
  CONSTRAINT SD_CAJAS_PK
 PRIMARY KEY
 (ID_CAJA)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_CIERRES 
-- 
ALTER TABLE SINDICATO.SD_CIERRES ADD (
  CONSTRAINT SD_CIERRES_PK
 PRIMARY KEY
 (ID_CIERRE)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_DESCUENTOS 
-- 
ALTER TABLE SINDICATO.SD_DESCUENTOS ADD (
  CONSTRAINT SD_DESCUENTOS_PK
 PRIMARY KEY
 (ID_DESCUENTO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_EGRESOS 
-- 
ALTER TABLE SINDICATO.SD_EGRESOS ADD (
  CONSTRAINT SD_EGRESOS_PK
 PRIMARY KEY
 (ID_EGRESO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_FONDO_EMERGENCIAS 
-- 
ALTER TABLE SINDICATO.SD_FONDO_EMERGENCIAS ADD (
  CONSTRAINT SD_FONDO_EMERGENCIAS_PK
 PRIMARY KEY
 (ID_FONDO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_HIST_EDICION_DATOS 
-- 
ALTER TABLE SINDICATO.SD_HIST_EDICION_DATOS ADD (
  CONSTRAINT SD_HIST_EDICION_DATOS_PK
 PRIMARY KEY
 (ID_HIST)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_IMAGENES 
-- 
ALTER TABLE SINDICATO.SD_IMAGENES ADD (
  CONSTRAINT SD_IMAGENES_PK
 PRIMARY KEY
 (ID_IMG)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_INGRESOS 
-- 
ALTER TABLE SINDICATO.SD_INGRESOS ADD (
  CONSTRAINT SD_INGRESOS_PK
 PRIMARY KEY
 (ID_INGRESO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_KARDEX_EFECTIVO 
-- 
ALTER TABLE SINDICATO.SD_KARDEX_EFECTIVO ADD (
  CONSTRAINT SD_KARDEX_EFECTIVO_PK
 PRIMARY KEY
 (ID_KARDEX)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_LINEAS 
-- 
ALTER TABLE SINDICATO.SD_LINEAS ADD (
  CONSTRAINT SD_LINEAS_PK
 PRIMARY KEY
 (ID_LINEA)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_LISTAS 
-- 
ALTER TABLE SINDICATO.SD_LISTAS ADD (
  CONSTRAINT PK_SG_LISTAS
 PRIMARY KEY
 (ID_LISTA)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_LISTAS_ITEMS 
-- 
ALTER TABLE SINDICATO.SD_LISTAS_ITEMS ADD (
  CONSTRAINT SG_LISTAS_ITEMS_PK
 PRIMARY KEY
 (ID_TABLA));

-- 
-- Non Foreign Key Constraints for Table SD_MENU_OPCIONES 
-- 
ALTER TABLE SINDICATO.SD_MENU_OPCIONES ADD (
  CONSTRAINT SG_MENU_OPCIONES_PK
 PRIMARY KEY
 (ID_OPC));

-- 
-- Non Foreign Key Constraints for Table SD_MOVILES 
-- 
ALTER TABLE SINDICATO.SD_MOVILES ADD (
  CONSTRAINT SD_MOVILES_PK
 PRIMARY KEY
 (ID_MOVIL)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_OBLIGACIONES_HOJA 
-- 
ALTER TABLE SINDICATO.SD_OBLIGACIONES_HOJA ADD (
  CONSTRAINT SD_OBLIGACIONES_HOJA_PK
 PRIMARY KEY
 (ID_OBLIGACION)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_PARADAS 
-- 
ALTER TABLE SINDICATO.SD_PARADAS ADD (
  CONSTRAINT SD_PARADAS_PK
 PRIMARY KEY
 (ID_PARADA)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_PARAMETROS_LINEA 
-- 
ALTER TABLE SINDICATO.SD_PARAMETROS_LINEA ADD (
  CONSTRAINT SD_PARAMETROS_LINEA_PK
 PRIMARY KEY
 (ID_PARAMETRO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_PERFILES 
-- 
ALTER TABLE SINDICATO.SD_PERFILES ADD (
  CONSTRAINT SG_PERFILES_PK
 PRIMARY KEY
 (ID_PERFIL));

-- 
-- Non Foreign Key Constraints for Table SD_PERFILES_OPCIONES 
-- 
ALTER TABLE SINDICATO.SD_PERFILES_OPCIONES ADD (
  CONSTRAINT SG_PERFILES_OPCIONES_PK
 PRIMARY KEY
 (ID_PRF_OPC));

-- 
-- Non Foreign Key Constraints for Table SD_SOCIOS 
-- 
ALTER TABLE SINDICATO.SD_SOCIOS ADD (
  CONSTRAINT SD_SOCIOS_PK
 PRIMARY KEY
 (ID_SOCIO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ),
  CONSTRAINT SD_SOCIOS_U01
 UNIQUE (NRO_SOCIO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_SOCIO_DESEMPENOS 
-- 
ALTER TABLE SINDICATO.SD_SOCIO_DESEMPENOS ADD (
  CONSTRAINT SD_SOCIO_DESEMPENOS_PK
 PRIMARY KEY
 (ID_DESEMPENO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_SOCIO_MOVILES 
-- 
ALTER TABLE SINDICATO.SD_SOCIO_MOVILES ADD (
  CONSTRAINT SD_SOCIO_MOVILES_PK
 PRIMARY KEY
 (ID_SOCIO_MOVIL)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_SOCIO_MOVIL_AUTOS 
-- 
ALTER TABLE SINDICATO.SD_SOCIO_MOVIL_AUTOS ADD (
  CONSTRAINT SD_SOCIO_MOVIL_AUTOS_PK
 PRIMARY KEY
 (ID_SOCIO_MOVIL_AUTO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_SOC_MOV_OBLIG 
-- 
ALTER TABLE SINDICATO.SD_SOC_MOV_OBLIG ADD (
  CONSTRAINT SD_SOC_MOV_OBLIG_PK
 PRIMARY KEY
 (ID_SOC_MOV_OBLIG)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_TRANSFERENCIAS 
-- 
ALTER TABLE SINDICATO.SD_TRANSFERENCIAS ADD (
  CONSTRAINT SD_TRANSFERENCIAS_PK
 PRIMARY KEY
 (ID_TRANSFERENCIA)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_USUARIOS 
-- 
ALTER TABLE SINDICATO.SD_USUARIOS ADD (
  CONSTRAINT SG_USUARIOS_PK
 PRIMARY KEY
 (ID_USUARIO));

-- 
-- Non Foreign Key Constraints for Table SD_VENTA_HOJAS 
-- 
ALTER TABLE SINDICATO.SD_VENTA_HOJAS ADD (
  CONSTRAINT SD_VENTA_HOJAS_PK
 PRIMARY KEY
 (ID_VENTA)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_VENTA_HOJAS_CONTROL 
-- 
ALTER TABLE SINDICATO.SD_VENTA_HOJAS_CONTROL ADD (
  CONSTRAINT SD_VENTA_HOJAS_CONTROL_PK
 PRIMARY KEY
 (ID_VENTA)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_AMORTIZACIONES 
-- 
ALTER TABLE SINDICATO.SD_AMORTIZACIONES ADD (
  CONSTRAINT SD_AMORTIZACIONES_PK
 PRIMARY KEY
 (ID_AMORTIZACION)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_CHOFERES 
-- 
ALTER TABLE SINDICATO.SD_CHOFERES ADD (
  CONSTRAINT SD_CHOFERES_PK
 PRIMARY KEY
 (ID_CHOFER)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_CIERRES_PARADA 
-- 
ALTER TABLE SINDICATO.SD_CIERRES_PARADA ADD (
  CONSTRAINT SD_CIERRES_PARADA_PK
 PRIMARY KEY
 (ID_CIERRE)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_DEPOSITO_FE 
-- 
ALTER TABLE SINDICATO.SD_DEPOSITO_FE ADD (
  CONSTRAINT SD_DEPOSITO_FE_PK
 PRIMARY KEY
 (ID_DEPOSITO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_DESCUENTOS_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_DESCUENTOS_SOCIO ADD (
  CONSTRAINT SD_DESCUENTOS_SOCIO_PK
 PRIMARY KEY
 (ID_DESCUENTO_SOCIO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_DETALLE_CIERRE_PARADA 
-- 
ALTER TABLE SINDICATO.SD_DETALLE_CIERRE_PARADA ADD (
  CONSTRAINT SD_DETALLE_CIERRE_PARADA_PK
 PRIMARY KEY
 (ID_DETALLE)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_DETALLE_HOJAS 
-- 
ALTER TABLE SINDICATO.SD_DETALLE_HOJAS ADD (
  CONSTRAINT SD_DETALLE_HOJAS_PK
 PRIMARY KEY
 (ID_DETALLE)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_DETALLE_PERIODO_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_DETALLE_PERIODO_SOCIO ADD (
  CONSTRAINT SD_DETALLE_PERIODO_SOCIO_PK
 PRIMARY KEY
 (ID_DETALLE)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_DOCUMENTACIONES 
-- 
ALTER TABLE SINDICATO.SD_DOCUMENTACIONES ADD (
  CONSTRAINT SD_DOCUMENTACIONES_PK
 PRIMARY KEY
 (ID_DOCUMENTACION)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_FAMILIARES 
-- 
ALTER TABLE SINDICATO.SD_FAMILIARES ADD (
  CONSTRAINT SD_FAMILIARES_PK
 PRIMARY KEY
 (ID_FAMILIAR)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_GARANTES 
-- 
ALTER TABLE SINDICATO.SD_GARANTES ADD (
  CONSTRAINT SD_GARANTES_PK
 PRIMARY KEY
 (ID_GARANTE)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_HOJAS_CONTROL 
-- 
ALTER TABLE SINDICATO.SD_HOJAS_CONTROL ADD (
  CONSTRAINT SD_HOJAS_CONTROL_PK
 PRIMARY KEY
 (ID_HOJA)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_HOJAS_LINEA 
-- 
ALTER TABLE SINDICATO.SD_HOJAS_LINEA ADD (
  CONSTRAINT SD_HOJAS_LINEA_PK
 PRIMARY KEY
 (ID_HOJA)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_INGRESOS_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_INGRESOS_SOCIO ADD (
  CONSTRAINT SD_INGRESOS_SOCIO_PK
 PRIMARY KEY
 (ID_INGRESO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_KARDEX_FM 
-- 
ALTER TABLE SINDICATO.SD_KARDEX_FM ADD (
  CONSTRAINT SD_KARDEX_FM_PK
 PRIMARY KEY
 (ID_KARDEX)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_KARDEX_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_KARDEX_SOCIO ADD (
  CONSTRAINT SD_KARDEX_SOCIO_PK
 PRIMARY KEY
 (ID_KARDEX)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_KARDEX_SOCIO_DEBE 
-- 
ALTER TABLE SINDICATO.SD_KARDEX_SOCIO_DEBE ADD (
  CONSTRAINT SD_KARDEX_SOCIO_DEBE_PK
 PRIMARY KEY
 (ID_KARDEX)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_OBLIGACIONES_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_OBLIGACIONES_SOCIO ADD (
  CONSTRAINT SD_OBLIGACIONES_SOCIO_PK
 PRIMARY KEY
 (ID_OBLIGACION)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_OTRAS_OBLIGACIONES 
-- 
ALTER TABLE SINDICATO.SD_OTRAS_OBLIGACIONES ADD (
  CONSTRAINT SD_OTRAS_OBLIGACIONES_PK
 PRIMARY KEY
 (ID_OBLIGACION)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_RETIRO_FE 
-- 
ALTER TABLE SINDICATO.SD_RETIRO_FE ADD (
  CONSTRAINT SD_RETIRO_FE_PK
 PRIMARY KEY
 (ID_RETIRO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_RETIRO_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_RETIRO_SOCIO ADD (
  CONSTRAINT SD_RETIRO_SOCIO_PK
 PRIMARY KEY
 (ID_RETIRO)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_ANTECEDENTES 
-- 
ALTER TABLE SINDICATO.SD_ANTECEDENTES ADD (
  CONSTRAINT SD_ANTECEDENTES_PK
 PRIMARY KEY
 (ID_ANTECEDENTE)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Non Foreign Key Constraints for Table SD_KARDEX_OBLIGACION 
-- 
ALTER TABLE SINDICATO.SD_KARDEX_OBLIGACION ADD (
  CONSTRAINT SD_KARDEX_OBLIGACION_PK
 PRIMARY KEY
 (ID_KARDEX)
    USING INDEX 
    TABLESPACE USERS
    PCTFREE    10
    INITRANS   2
    MAXTRANS   255
    STORAGE    (
                INITIAL          64K
                NEXT             1M
                MINEXTENTS       1
                MAXEXTENTS       UNLIMITED
                PCTINCREASE      0
               ));

-- 
-- Foreign Key Constraints for Table SD_DESCUENTOS 
-- 
ALTER TABLE SINDICATO.SD_DESCUENTOS ADD (
  CONSTRAINT SD_DESCUENTOS_R01 
 FOREIGN KEY (ID_CIERRE) 
 REFERENCES SINDICATO.SD_CIERRES (ID_CIERRE),
  CONSTRAINT SD_DESCUENTOS_R02 
 FOREIGN KEY (ID_CAJA) 
 REFERENCES SINDICATO.SD_CAJAS (ID_CAJA));

-- 
-- Foreign Key Constraints for Table SD_EGRESOS 
-- 
ALTER TABLE SINDICATO.SD_EGRESOS ADD (
  CONSTRAINT SD_EGRESOS_R01 
 FOREIGN KEY (ID_CAJA) 
 REFERENCES SINDICATO.SD_CAJAS (ID_CAJA));

-- 
-- Foreign Key Constraints for Table SD_INGRESOS 
-- 
ALTER TABLE SINDICATO.SD_INGRESOS ADD (
  CONSTRAINT SD_INGRESOS_R01 
 FOREIGN KEY (ID_CAJA) 
 REFERENCES SINDICATO.SD_CAJAS (ID_CAJA));

-- 
-- Foreign Key Constraints for Table SD_KARDEX_EFECTIVO 
-- 
ALTER TABLE SINDICATO.SD_KARDEX_EFECTIVO ADD (
  CONSTRAINT SD_KARDEX_EFECTIVO_R01 
 FOREIGN KEY (ID_CAJA) 
 REFERENCES SINDICATO.SD_CAJAS (ID_CAJA));

-- 
-- Foreign Key Constraints for Table SD_LISTAS_ITEMS 
-- 
ALTER TABLE SINDICATO.SD_LISTAS_ITEMS ADD (
  CONSTRAINT SG_LISTAS_ITEMS_R01 
 FOREIGN KEY (ID_LISTA) 
 REFERENCES SINDICATO.SD_LISTAS (ID_LISTA),
  CONSTRAINT SG_LISTAS_ITEMS_R02 
 FOREIGN KEY (ID_PADRE) 
 REFERENCES SINDICATO.SD_LISTAS_ITEMS (ID_TABLA));

-- 
-- Foreign Key Constraints for Table SD_MOVILES 
-- 
ALTER TABLE SINDICATO.SD_MOVILES ADD (
  CONSTRAINT SD_MOVILES_R01 
 FOREIGN KEY (ID_LINEA) 
 REFERENCES SINDICATO.SD_LINEAS (ID_LINEA));

-- 
-- Foreign Key Constraints for Table SD_OBLIGACIONES_HOJA 
-- 
ALTER TABLE SINDICATO.SD_OBLIGACIONES_HOJA ADD (
  CONSTRAINT SD_OBLIGACIONES_HOJA_R01 
 FOREIGN KEY (ID_LINEA) 
 REFERENCES SINDICATO.SD_LINEAS (ID_LINEA),
  CONSTRAINT SD_OBLIGACIONES_HOJA_R02 
 FOREIGN KEY (ID_CAJA) 
 REFERENCES SINDICATO.SD_CAJAS (ID_CAJA));

-- 
-- Foreign Key Constraints for Table SD_PARADAS 
-- 
ALTER TABLE SINDICATO.SD_PARADAS ADD (
  CONSTRAINT SD_PARADAS_R01 
 FOREIGN KEY (ID_CAJA) 
 REFERENCES SINDICATO.SD_CAJAS (ID_CAJA));

-- 
-- Foreign Key Constraints for Table SD_PARAMETROS_LINEA 
-- 
ALTER TABLE SINDICATO.SD_PARAMETROS_LINEA ADD (
  CONSTRAINT SD_PARAMETROS_LINEA_R01 
 FOREIGN KEY (ID_LINEA) 
 REFERENCES SINDICATO.SD_LINEAS (ID_LINEA));

-- 
-- Foreign Key Constraints for Table SD_PERFILES 
-- 
ALTER TABLE SINDICATO.SD_PERFILES ADD (
  CONSTRAINT SD_PERFILES_R01 
 FOREIGN KEY (ID_PARADA) 
 REFERENCES SINDICATO.SD_PARADAS (ID_PARADA));

-- 
-- Foreign Key Constraints for Table SD_PERFILES_OPCIONES 
-- 
ALTER TABLE SINDICATO.SD_PERFILES_OPCIONES ADD (
  CONSTRAINT SG_PERFILES_OPCIONES_R01 
 FOREIGN KEY (ID_PERFIL) 
 REFERENCES SINDICATO.SD_PERFILES (ID_PERFIL),
  CONSTRAINT SG_PERFILES_OPCIONES_R02 
 FOREIGN KEY (ID_OPC) 
 REFERENCES SINDICATO.SD_MENU_OPCIONES (ID_OPC));

-- 
-- Foreign Key Constraints for Table SD_SOCIO_DESEMPENOS 
-- 
ALTER TABLE SINDICATO.SD_SOCIO_DESEMPENOS ADD (
  CONSTRAINT SD_SOCIO_DESEMPENOS_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO));

-- 
-- Foreign Key Constraints for Table SD_SOCIO_MOVILES 
-- 
ALTER TABLE SINDICATO.SD_SOCIO_MOVILES ADD (
  CONSTRAINT SD_SOCIO_MOVILES_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO),
  CONSTRAINT SD_SOCIO_MOVILES_R02 
 FOREIGN KEY (ID_MOVIL) 
 REFERENCES SINDICATO.SD_MOVILES (ID_MOVIL));

-- 
-- Foreign Key Constraints for Table SD_SOCIO_MOVIL_AUTOS 
-- 
ALTER TABLE SINDICATO.SD_SOCIO_MOVIL_AUTOS ADD (
  CONSTRAINT SD_SOCIO_MOVIL_AUTOS_R01 
 FOREIGN KEY (ID_SOCIO_MOVIL) 
 REFERENCES SINDICATO.SD_SOCIO_MOVILES (ID_SOCIO_MOVIL),
  CONSTRAINT SD_SOCIO_MOVIL_AUTOS_R02 
 FOREIGN KEY (ID_AUTO) 
 REFERENCES SINDICATO.SD_AUTOS (ID_AUTO));

-- 
-- Foreign Key Constraints for Table SD_SOC_MOV_OBLIG 
-- 
ALTER TABLE SINDICATO.SD_SOC_MOV_OBLIG ADD (
  CONSTRAINT SD_SOC_MOV_OBLIG_R01 
 FOREIGN KEY (ID_OBLIGACION) 
 REFERENCES SINDICATO.SD_OBLIGACIONES_HOJA (ID_OBLIGACION),
  CONSTRAINT SD_SOC_MOV_OBLIG_R02 
 FOREIGN KEY (ID_SOCIO_MOVIL) 
 REFERENCES SINDICATO.SD_SOCIO_MOVILES (ID_SOCIO_MOVIL));

-- 
-- Foreign Key Constraints for Table SD_TRANSFERENCIAS 
-- 
ALTER TABLE SINDICATO.SD_TRANSFERENCIAS ADD (
  CONSTRAINT SD_TRANSFERENCIAS_R01 
 FOREIGN KEY (ID_CAJA_ORIGEN) 
 REFERENCES SINDICATO.SD_CAJAS (ID_CAJA),
  CONSTRAINT SD_TRANSFERENCIAS_R02 
 FOREIGN KEY (ID_CAJA_DESTINO) 
 REFERENCES SINDICATO.SD_CAJAS (ID_CAJA));

-- 
-- Foreign Key Constraints for Table SD_USUARIOS 
-- 
ALTER TABLE SINDICATO.SD_USUARIOS ADD (
  CONSTRAINT SG_USUARIOS_R01 
 FOREIGN KEY (ID_PERFIL) 
 REFERENCES SINDICATO.SD_PERFILES (ID_PERFIL));

-- 
-- Foreign Key Constraints for Table SD_VENTA_HOJAS 
-- 
ALTER TABLE SINDICATO.SD_VENTA_HOJAS ADD (
  CONSTRAINT SD_VENTA_HOJAS_R01 
 FOREIGN KEY (ID_PARADA) 
 REFERENCES SINDICATO.SD_PARADAS (ID_PARADA),
  CONSTRAINT SD_VENTA_HOJAS_R02 
 FOREIGN KEY (ID_SOCIO_MOVIL) 
 REFERENCES SINDICATO.SD_SOCIO_MOVILES (ID_SOCIO_MOVIL));

-- 
-- Foreign Key Constraints for Table SD_VENTA_HOJAS_CONTROL 
-- 
ALTER TABLE SINDICATO.SD_VENTA_HOJAS_CONTROL ADD (
  CONSTRAINT SD_VENTA_HOJAS_CONTROL_R01 
 FOREIGN KEY (ID_PARADA) 
 REFERENCES SINDICATO.SD_PARADAS (ID_PARADA),
  CONSTRAINT SD_VENTA_HOJAS_CONTROL_R02 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO),
  CONSTRAINT SD_VENTA_HOJAS_CONTROL_R03 
 FOREIGN KEY (ID_CAJA) 
 REFERENCES SINDICATO.SD_CAJAS (ID_CAJA));

-- 
-- Foreign Key Constraints for Table SD_AMORTIZACIONES 
-- 
ALTER TABLE SINDICATO.SD_AMORTIZACIONES ADD (
  CONSTRAINT SD_AMORTIZACIONES_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO),
  CONSTRAINT SD_AMORTIZACIONES_R02 
 FOREIGN KEY (ID_CAJA) 
 REFERENCES SINDICATO.SD_CAJAS (ID_CAJA));

-- 
-- Foreign Key Constraints for Table SD_CHOFERES 
-- 
ALTER TABLE SINDICATO.SD_CHOFERES ADD (
  CONSTRAINT SD_CHOFERES_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO));

-- 
-- Foreign Key Constraints for Table SD_CIERRES_PARADA 
-- 
ALTER TABLE SINDICATO.SD_CIERRES_PARADA ADD (
  CONSTRAINT SD_CIERRES_PARADA_R01 
 FOREIGN KEY (ID_PARADA) 
 REFERENCES SINDICATO.SD_PARADAS (ID_PARADA));

-- 
-- Foreign Key Constraints for Table SD_DEPOSITO_FE 
-- 
ALTER TABLE SINDICATO.SD_DEPOSITO_FE ADD (
  CONSTRAINT SD_DEPOSITO_FE_R01 
 FOREIGN KEY (ID_CHOFER) 
 REFERENCES SINDICATO.SD_CHOFERES (ID_CHOFER));

-- 
-- Foreign Key Constraints for Table SD_DESCUENTOS_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_DESCUENTOS_SOCIO ADD (
  CONSTRAINT SD_DESCUENTOS_SOCIO_R01 
 FOREIGN KEY (ID_DESCUENTO) 
 REFERENCES SINDICATO.SD_DESCUENTOS (ID_DESCUENTO),
  CONSTRAINT SD_DESCUENTOS_SOCIO_R02 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO));

-- 
-- Foreign Key Constraints for Table SD_DETALLE_CIERRE_PARADA 
-- 
ALTER TABLE SINDICATO.SD_DETALLE_CIERRE_PARADA ADD (
  CONSTRAINT SD_DETALLE_CIERRE_PARADA_R01 
 FOREIGN KEY (ID_CIERRE) 
 REFERENCES SINDICATO.SD_CIERRES_PARADA (ID_CIERRE));

-- 
-- Foreign Key Constraints for Table SD_DETALLE_HOJAS 
-- 
ALTER TABLE SINDICATO.SD_DETALLE_HOJAS ADD (
  CONSTRAINT SD_DETALLE_HOJAS_R01 
 FOREIGN KEY (ID_VENTA) 
 REFERENCES SINDICATO.SD_VENTA_HOJAS (ID_VENTA));

-- 
-- Foreign Key Constraints for Table SD_DETALLE_PERIODO_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_DETALLE_PERIODO_SOCIO ADD (
  CONSTRAINT SD_DETALLE_PERIODO_SOCIO_R01 
 FOREIGN KEY (ID_CIERRE) 
 REFERENCES SINDICATO.SD_CIERRES (ID_CIERRE),
  CONSTRAINT SD_DETALLE_PERIODO_SOCIO_R02 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO));

-- 
-- Foreign Key Constraints for Table SD_DOCUMENTACIONES 
-- 
ALTER TABLE SINDICATO.SD_DOCUMENTACIONES ADD (
  CONSTRAINT SD_DOCUMENTACIONES_R02 
 FOREIGN KEY (ID_CHOFER) 
 REFERENCES SINDICATO.SD_CHOFERES (ID_CHOFER));

-- 
-- Foreign Key Constraints for Table SD_FAMILIARES 
-- 
ALTER TABLE SINDICATO.SD_FAMILIARES ADD (
  CONSTRAINT SD_FAMILIARES_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO),
  CONSTRAINT SD_FAMILIARES_R02 
 FOREIGN KEY (ID_CHOFER) 
 REFERENCES SINDICATO.SD_CHOFERES (ID_CHOFER));

-- 
-- Foreign Key Constraints for Table SD_GARANTES 
-- 
ALTER TABLE SINDICATO.SD_GARANTES ADD (
  CONSTRAINT SD_GARANTES_R01 
 FOREIGN KEY (ID_CHOFER) 
 REFERENCES SINDICATO.SD_CHOFERES (ID_CHOFER),
  CONSTRAINT SD_GARANTES_R02 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO));

-- 
-- Foreign Key Constraints for Table SD_HOJAS_CONTROL 
-- 
ALTER TABLE SINDICATO.SD_HOJAS_CONTROL ADD (
  CONSTRAINT SD_HOJAS_CONTROL_R01 
 FOREIGN KEY (ID_MOVIL) 
 REFERENCES SINDICATO.SD_MOVILES (ID_MOVIL),
  CONSTRAINT SD_HOJAS_CONTROL_R02 
 FOREIGN KEY (ID_PARADA) 
 REFERENCES SINDICATO.SD_PARADAS (ID_PARADA));

-- 
-- Foreign Key Constraints for Table SD_HOJAS_LINEA 
-- 
ALTER TABLE SINDICATO.SD_HOJAS_LINEA ADD (
  CONSTRAINT SD_HOJAS_LINEA_R01 
 FOREIGN KEY (ID_LINEA) 
 REFERENCES SINDICATO.SD_LINEAS (ID_LINEA));

-- 
-- Foreign Key Constraints for Table SD_INGRESOS_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_INGRESOS_SOCIO ADD (
  CONSTRAINT SD_INGRESOS_SOCIO_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO));

-- 
-- Foreign Key Constraints for Table SD_KARDEX_FM 
-- 
ALTER TABLE SINDICATO.SD_KARDEX_FM ADD (
  CONSTRAINT SD_KARDEX_FM_R01 
 FOREIGN KEY (ID_CHOFER) 
 REFERENCES SINDICATO.SD_CHOFERES (ID_CHOFER));

-- 
-- Foreign Key Constraints for Table SD_KARDEX_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_KARDEX_SOCIO ADD (
  CONSTRAINT SD_KARDEX_SOCIO_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO));

-- 
-- Foreign Key Constraints for Table SD_KARDEX_SOCIO_DEBE 
-- 
ALTER TABLE SINDICATO.SD_KARDEX_SOCIO_DEBE ADD (
  CONSTRAINT SD_KARDEX_SOCIO_DEBE_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO));

-- 
-- Foreign Key Constraints for Table SD_OBLIGACIONES_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_OBLIGACIONES_SOCIO ADD (
  CONSTRAINT SD_OBLIGACIONES_SOCIO_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO));

-- 
-- Foreign Key Constraints for Table SD_OTRAS_OBLIGACIONES 
-- 
ALTER TABLE SINDICATO.SD_OTRAS_OBLIGACIONES ADD (
  CONSTRAINT SD_OTRAS_OBLIGACIONES_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO),
  CONSTRAINT SD_OTRAS_OBLIGACIONES_R02 
 FOREIGN KEY (ID_CIERRE) 
 REFERENCES SINDICATO.SD_CIERRES (ID_CIERRE));

-- 
-- Foreign Key Constraints for Table SD_RETIRO_FE 
-- 
ALTER TABLE SINDICATO.SD_RETIRO_FE ADD (
  CONSTRAINT SD_RETIRO_FE_R01 
 FOREIGN KEY (ID_CHOFER) 
 REFERENCES SINDICATO.SD_CHOFERES (ID_CHOFER));

-- 
-- Foreign Key Constraints for Table SD_RETIRO_SOCIO 
-- 
ALTER TABLE SINDICATO.SD_RETIRO_SOCIO ADD (
  CONSTRAINT SD_RETIRO_SOCIO_R01 
 FOREIGN KEY (ID_SOCIO) 
 REFERENCES SINDICATO.SD_SOCIOS (ID_SOCIO));

-- 
-- Foreign Key Constraints for Table SD_ANTECEDENTES 
-- 
ALTER TABLE SINDICATO.SD_ANTECEDENTES ADD (
  CONSTRAINT SD_ANTECEDENTES_R02 
 FOREIGN KEY (ID_CHOFER) 
 REFERENCES SINDICATO.SD_CHOFERES (ID_CHOFER));

-- 
-- Foreign Key Constraints for Table SD_KARDEX_OBLIGACION 
-- 
ALTER TABLE SINDICATO.SD_KARDEX_OBLIGACION ADD (
  CONSTRAINT SD_KARDEX_OBLIGACION_R01 
 FOREIGN KEY (ID_OBLIGACION) 
 REFERENCES SINDICATO.SD_OBLIGACIONES_SOCIO (ID_OBLIGACION));
DROP VIEW SINDICATO.V_TABLAS_COLUMNAS;

/* Formatted on 12/10/2015 11:41:51 PM (QP5 v5.136.908.31019) */
--
-- V_TABLAS_COLUMNAS  (View)
--

CREATE OR REPLACE FORCE VIEW SINDICATO.V_TABLAS_COLUMNAS
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
          AND a.owner = 'SINDICATO'
          AND a.column_name = u.column_name;


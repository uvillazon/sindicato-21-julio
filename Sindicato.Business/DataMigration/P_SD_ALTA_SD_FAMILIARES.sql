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
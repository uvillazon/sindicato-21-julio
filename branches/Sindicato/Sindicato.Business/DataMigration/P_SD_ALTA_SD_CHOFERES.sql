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
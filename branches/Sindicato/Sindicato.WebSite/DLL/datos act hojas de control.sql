CREATE OR REPLACE PROCEDURE SINDICATO_132.P_ACT_HOJAS_OLD(
p_usr VARCHAR2,
p_res OUT VARCHAR2
)
IS
v_cnt NUMBER:=0;
v_res VARCHAR2(100):='0';
v_errC SD_AUX_LOG_ERRORES.cod_error%type;
v_errD SD_AUX_LOG_ERRORES.desc_error%type;
v_id_log SINDICATO_132.sd_aux_log_errores.id_log%type;
v_id NUMBER;
v_fecha DATE;
v_nro_movil  NUMBER := 0;
BEGIN
IF p_usr  IS NULL 
THEN
v_res := 'Faltan parametros.';
END IF;
IF v_res =  '0' THEN

--       SELECT * FROM SINDICATO_132_OLD.HOJA_CONTROL
--       
--       where id_movil NOT IN (SELECT ID_MOVIL FROM SD_MOVILES )
--       
--       select * from  SINDICATO_132_OLD.HOJA_CONTROL where id_movil = 376
--       WHERE id_movil  IN (select id_movil from sindicato_132_old.movil where id_linea = 1)
--       
--       
--       select * from sd_moviles where id_movil NOT IN (select id_movil from sindicato_132_old.movil where id_linea = 2 )
--        
--       select * from SINDICATO_132_OLD.MOVIL
--       
--       SELECT * from sd_socios
--       
--       select * from SD_SOCIO_MOVILES 
 
    --SELECT hoj.numero_hoja ,1, soc.id_socio_movil , 0 ,HOJ.FECHA_DE_COMPRA ,hoj.total_hoja ,HOJ.FECHA_DE_USO  , 'migracion de sistema', 'NUEVO','admin', HOJ.FECHA_DE_COMPRA from SINDICATO_132_OLD.HOJA_CONTROL hoj , SD_SOCIO_MOVILES soc WHERE HOJ.ID_MOVIL = SOC.ID_MOVIL
     --select * from  SINDICATO_132_OLD.HOJA_CONTROL  WHERE id_movil  IN (select id_movil from sindicato_132_old.movil where id_linea = 1)
      FOR x IN (SELECT hoj.* , SOC.ID_SOCIO_MOVIL FROM  SINDICATO_132_OLD.HOJA_CONTROL hoj , SD_SOCIO_MOVILES soc WHERE HOJ.ID_MOVIL = SOC.ID_MOVIL   ) LOOP
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

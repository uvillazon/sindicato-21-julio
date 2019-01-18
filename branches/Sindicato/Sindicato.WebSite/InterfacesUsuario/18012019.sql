CREATE OR REPLACE PROCEDURE SINDICATO_121.P_SD_GUARDAR_HOJA(
p_ID_SOCIO_MOVIL  SINDICATO_121.SD_HOJAS_CONTROL.ID_SOCIO_MOVIL%type,
p_id_parada SINDICATO_121.SD_HOJAS_CONTROL.Id_PARADA%type,
p_id_chofer SINDICATO_121.SD_HOJAS_CONTROL.ID_CHOFER%type,
p_fecha_compra SINDICATO_121.SD_HOJAS_CONTROL.FECHA_COMPRA %type,
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
v_id_log SINDICATO_121.sd_aux_log_errores.id_log%type;
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
                INSERT INTO SD_DETALLES_HOJAS_USO  VALUES( Q_SD_DETALLES_HOJAS_USO.nextval , v_id_hoja ,x.DIA , 'NUEVO',sysdate);
                              
                END LOOP;
                
        ELSE 
                INSERT INTO SD_DETALLES_HOJAS_USO  VALUES( Q_SD_DETALLES_HOJAS_USO.nextval , v_id_hoja ,p_fecha_compra , 'NUEVO',sysdate);
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



AGREGAR la columna TIPO en la tabla SD_INGRESOS


CREATE TABLE SINDICATO_121.SD_REP_INGRESOS_EGRESOS
(
  ID   NUMBER(12)                        NOT NULL,
  FECHA        DATE                             NOT NULL,
  INGRESO_EGRESO     VARCHAR2(255 BYTE)           ,
  COMPROBANTES     VARCHAR2(255 BYTE)              ,
  CONCEPTOS  VARCHAR2(1500 BYTE),
  CANTIDAD    NUMBER(7) ,
  IMPORTE_BS      NUMBER(15,5)                    ,
  IMPORTE_SUS      NUMBER(15,5)                    ,
  LOGIN        VARCHAR2(50 BYTE),
  FECHA_REG    DATE
)
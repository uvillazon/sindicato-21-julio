SET DEFINE OFF;
DELETE FROM SD_TIPOS_EGRESOS ;
DELETE FROM SD_EGRESOS ;
DELETE FROM SD_PAGO_DE_PRESTAMOS  ;
DELETE FROM SD_PRESTAMOS_MORA ;
DELETE FROM SD_PLAN_DE_PAGO ;
DELETE FROM SD_PRESTAMOS_POR_SOCIOS ;
DELETE FROM SD_TIPOS_PRESTAMOS ;

DELETE FROM SD_INGRESOS ;

DELETE FROM SD_TRANSFERENCIAS ;

DELETE FROM SD_PERMISOS ;

DELETE FROM SD_DETALLES_REGULARIZACIONES ;
DELETE FROM SD_REGULARIZACIONES ;


DELETE FROM SD_INGRESOS_POR_SOCIOS ;
DELETE FROM SD_TIPOS_INGRESOS_SOCIO ;

DELETE FROM SD_DETALLES_DEUDAS  ;
DELETE FROM SD_DEUDAS_SOCIOS ;

DELETE FROM SD_ANULACIONES; 
DELETE FROM SD_DETALLES_HOJAS_USO ;
DELETE FROM SD_DETALLES_HOJAS_CONTROL ;
DELETE FROM SD_VENTA_HOJAS ;
DELETE FROM SD_HOJAS_CONTROL ;
DELETE FROM SD_KARDEX_EFECTIVO ;
DELETE FROM SD_KARDEX_HOJAS;

--DELETE FROM SD_SOCIO_MOVIL_AUTOS  ;
--DELETE FROM SD_AUTOS ;
--DELETE FROM SD_SOC_MOV_OBLIG   ;
--DELETE FROM SD_SOCIO_MOVILES ;
--DELETE FROM SD_MOVILES ;
--DELETE FROM SD_SOCIOS ;
UPDATE SD_CAJAS SET SALDO = 0;
UPDATE SD_SOCIO_MOVILES SET FECHA_ALTA = to_date('01/01/2019','DD/MM/YYYY') , FECHA_REG = to_date('01/01/2019','DD/MM/YYYY') 
 ;
COMMIT;
DECLARE 
  P_CRITERIO VARCHAR2(32767);
  P_RES NUMBER;

BEGIN 
  P_CRITERIO := '%';
  P_RES := NULL;

  SINDICATO_121.P_AUX_ACT_SECUENCIA_A ( P_CRITERIO, P_RES );
  COMMIT; 
END;



--update SD_MENU_OPCIONES set estado  ='B'  , orden = 0;
SET DEFINE OFF;
DELETE FROM SD_ANULACIONES; 
DELETE FROM SD_DETALLES_HOJAS_USO ;
DELETE FROM SD_DETALLES_HOJAS_CONTROL ;
DELETE FROM SD_VENTA_HOJAS ;
DELETE FROM SD_HOJAS_CONTROL ;
DELETE FROM SD_KARDEX_EFECTIVO ;
DELETE FROM SD_KARDEX_HOJAS;

DELETE FROM SD_SOCIO_MOVIL_AUTOS  ;
DELETE FROM SD_AUTOS ;
DELETE FROM SD_SOC_MOV_OBLIG   ;
DELETE FROM SD_SOCIO_MOVILES ;
DELETE FROM SD_MOVILES ;
DELETE FROM SD_SOCIOS ;
UPDATE SD_CAJAS SET SALDO = 0;
COMMIT;


--update SD_MENU_OPCIONES set estado  ='B'  , orden = 0;
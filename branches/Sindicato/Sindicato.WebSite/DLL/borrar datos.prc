delete from SD_INGRESOS ;

delete from SD_INGRESOS_POR_SOCIOS ;

delete from SD_KARDEX_EFECTIVO ;

update SD_CAJAS  SET SALDO = 0;
delete from SD_VENTA_HOJAS  ; 
delete from SD_DETALLES_HOJAS_CONTROL ;
delete from SD_ANULACIONES ;
delete from SD_IMPRESIONES ;
 delete from SD_HOJAS_CONTROL ;
 delete from SD_TRANSFERENCIAS ;
 commit;
 
 
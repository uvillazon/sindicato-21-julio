select nvl( sum(IMPORTE) , 0)  from SD_INGRESOS  where ID_CAJA = 9 and ESTADO != 'ANULADO'
                             AND FECHA BETWEEN TO_DATE('01-03-2025', 'DD-MM-YYYY')
        AND TO_DATE('01-08-2025', 'DD-MM-YYYY');


select nvl( sum(IMPORTE) , 0 )  from SD_TRANSFERENCIAS where ID_CAJA_DESTINO = 9 and ESTADO != 'ANULADO'
                                  AND FECHA BETWEEN TO_DATE('01-03-2025', 'DD-MM-YYYY')
        AND TO_DATE('01-08-2025', 'DD-MM-YYYY');

select nvl(sum(IMPORTE_PRESTAMO) , 0) from SD_PRESTAMOS_POR_SOCIOS where ESTADO != 'ANULADO' and FECHA BETWEEN TO_DATE('01-03-2025', 'DD-MM-YYYY')
    AND TO_DATE('01-08-2025', 'DD-MM-YYYY');

select nvl( sum(IMPORTE) ,0) as importe , nvl (sum(IMPORTE_MORA) ,0) as moras , nvl(sum(TOTAL_CONDONACION),0) from SD_PAGO_DE_PRESTAMOS where ID_CAJA = 9 and ESTADO != 'ANULADO' and FECHA  BETWEEN TO_DATE('01-03-2025', 'DD-MM-YYYY')
    AND TO_DATE('01-08-2025', 'DD-MM-YYYY');
select IMPORTE_MORA , IMPORTE , TOTAL_CONDONACION from SD_PAGO_DE_PRESTAMOS where ID_CAJA = 9 and ESTADO != 'ANULADO' and FECHA  BETWEEN TO_DATE('01-03-2025', 'DD-MM-YYYY')
    AND TO_DATE('01-08-2025', 'DD-MM-YYYY');
select sum from SD_PAGO_DE_PRESTAMOS where ID_CAJA = 9 and ESTADO != 'ANULADO' and FECHA  BETWEEN TO_DATE('01-03-2025', 'DD-MM-YYYY')
    AND TO_DATE('01-08-2025', 'DD-MM-YYYY') and ID_PRESTAMO = 105;

select * from SD_PRESTAMOS_POR_SOCIOS  where ID_PRESTAMO = 105;

select INGRESO - EGRESO from SD_KARDEX_EFECTIVO where ID_CAJA = 9;
select * from SD_KARDEX_EFECTIVO where ID_CAJA = 9;

select sum(INGRESO - EGRESO) from SD_KARDEX_EFECTIVO where ID_CAJA = 9
select sum(EGRESO)
from SD_KARDEX_EFECTIVO
where ID_CAJA = 9
  and EGRESO > 0 and OPERACION = 'PRESTAMOS';

select sum(INGRESO)
from SD_KARDEX_EFECTIVO
where ID_CAJA = 9 and OPERACION = 'PAGO PRESTAMO';

select OPERACION , count(1) from SD_KARDEX_EFECTIVO where ID_CAJA = 9 group by OPERACION;

select * from SD_KARDEX_EFECTIVO where OPERACION = 'RETIRO DE AHORRO' and ID_CAJA = 9


select nvl(sum(IMPORTE_INTERES) , 0) from SD_PRESTAMOS_POR_SOCIOS where ESTADO != 'ANULADO' and FECHA BETWEEN TO_DATE('01-03-2025', 'DD-MM-YYYY')
    AND TO_DATE('01-08-2025', 'DD-MM-YYYY');
select  nvl(sum(IMPORTE_MORA) , 0) from SD_PRESTAMOS_MORA where FECHA BETWEEN TO_DATE('01-03-2025', 'DD-MM-YYYY')
                                          AND TO_DATE('01-08-2025', 'DD-MM-YYYY') and ESTADO != 'ANULADO';

select  nvl(sum(IMPORTE_A_PAGAR) , 0) ,  nvl(sum(INTERES_A_PAGAR) , 0) ,  nvl(sum(MORA_A_PAGAR) , 0) , nvl(sum(CONDONACION) , 0) from SD_PLAN_DE_PAGO p  where ESTADO = 'CANCELADO' and fecha_cancelado  BETWEEN TO_DATE('01-03-2025', 'DD-MM-YYYY')
    AND TO_DATE('01-08-2025', 'DD-MM-YYYY');


select * from SD_PLAN_DE_PAGO where ID_PLAN = 234;
select * from SD_PLAN_DE_PAGO where ID_PRESTAMO = 234;
select * From SD_PRESTAMOS_POR_SOCIOS where NUMERO = 185
select * from SD_PRESTAMOS_POR_SOCIOS;
select * from SD_KARDEX_EFECTIVO order by FECHA_REG desc;
select * from SD_KARDEX_EFECTIVO where OPERACION = 'PRESTAMOS' and ID_OPERACION in (select ID_PRESTAMO from SD_PRESTAMOS_POR_SOCIOS);
delete from SD_KARDEX_EFECTIVO where OPERACION = 'PRESTAMOS' and ID_OPERACION in (select ID_PRESTAMO from SD_PRESTAMOS_POR_SOCIOS);

select * from SD_PAGO_DE_PRESTAMOS;
select * from SD_KARDEX_EFECTIVO where OPERACION = 'PAGO PRESTAMO' and ID_OPERACION in (select ID_PAGO from SD_PAGO_DE_PRESTAMOS);
delete from SD_KARDEX_EFECTIVO where OPERACION = 'PAGO PRESTAMO' and ID_OPERACION in (select ID_PAGO from SD_PAGO_DE_PRESTAMOS);
delete from SD_KARDEX_EFECTIVO where OPERACION = 'PAGO MORA';

delete from SD_PAGO_DE_PRESTAMOS where ID_PAGO>=0;
delete from SD_PRESTAMOS_POR_SOCIOS where SD_PRESTAMOS_POR_SOCIOS.ID_PRESTAMO>=0;

delete from SD_PLAN_DE_PAGO where ID_PLAN >= 0;
delete from SD_PRESTAMOS_MORA where ID_MORA >=0;
select * from SD_CAJAS;
update SD_TIPOS_PRESTAMOS set DIAS_ESPERA_MORA = 0;
select * from SD_PRESTAMOS_POR_SOCIOS order by ID_PRESTAMO desc;
select * from SD_GESTION;
select * from SD_MENU_OPCIONES order by ID_OPC desc;

select * from SD_TIPOS_PRESTAMOS;
select * from SD_LISTAS_ITEMS order by ID_TABLA desc;

INSERT INTO SINDICATO_132.SD_MENU_OPCIONES (ID_OPC, OPCION, LINK, TOOLTIP, ICONO, ESTILO, ID_PADRE, ESTADO, ORDEN)
VALUES (36, 'Gestion', 'App.View.Gestion.Principal', 'Cierre de Gestion', 'application-settings-icon', null, null, 'A', 13);

select * from SD_PRESTAMOS_POR_SOCIOS order by ID_PRESTAMO desc;
select * from SD_PLAN_DE_PAGO where ID_PRESTAMO = 59;
delete from SD_PLAN_DE_PAGO where ID_PRESTAMO = 59;
delete from SD_PRESTAMOS_POR_SOCIOS where ID_PRESTAMO = 59;
delete from SD_GESTION where ID_GESTION = -1;
select * from SD_GESTION;
select * from SD_PAGO_DE_PRESTAMOS order by ID_PAGO desc;

update SD_PAGO_DE_PRESTAMOS set ID_GESTION = 1;

select sum(CONDONACION) from SD_PLAN_DE_PAGO where ID_PAGO = 155;
select * from SD_PAGO_DE_PRESTAMOS where ID_PAGO = 155;
select * from SD_PAGO_DE_PRESTAMOS where Id_gestion = 2;
delete from SD_PAGO_DE_PRESTAMOS where Id_gestion = 2;
select  * from SD_PRESTAMOS_POR_SOCIOS where ID_GESTION = 2;
delete from SD_PRESTAMOS_POR_SOCIOS where ID_GESTION = 2;
delete from SD_PLAN_DE_PAGO where ID_PRESTAMO = 60;
select * from SD_PRESTAMOS_MORA order by ID_MORA desc;
delete from SD_PRESTAMOS_MORA where ESTADO = 'ANULADO';
select * from SD_GESTION;
select * from SD_DETALLE_CIERRE_GESTION where ID_GESTION =1;
delete from SD_DETALLE_CIERRE_GESTION where ID_GESTION = 2;
delete from SD_GESTION where ID_GESTION =2;
select * from SD_PRESTAMOS_POR_SOCIOS order by ID_PRESTAMO desc;
select FECHA_PAGO , FECHA_PAGO - 30 from SD_PLAN_DE_PAGO where ID_PRESTAMO = 64 order by FECHA_PAGO asc;
select FECHA_PAGO , FECHA_PAGO - 30 from SD_PLAN_DE_PAGO where ID_PRESTAMO = 61 order by FECHA_PAGO asc;
select * from SD_PRESTAMOS_MORA order by FECHA_REG desc;
select * from SD_PRESTAMOS_POR_SOCIOS order by ID_PRESTAMO desc;
update SD_PLAN_DE_PAGO set FECHA_PAGO  = FECHA_PAGO - 30 where ID_PRESTAMO = 64;
update SD_PLAN_DE_PAGO set FECHA_PAGO  = FECHA_PAGO - 5 where ID_PRESTAMO = 65;
update SD_PLAN_DE_PAGO set FECHA_PAGO  = FECHA_PAGO - 30 where ID_PRESTAMO = 63;
update SD_PLAN_DE_PAGO set mora_a_pagar = 0 ;
-- select * from SD_PRESTAMOS_MORA
UPDATE SD_PLAN_DE_PAGO set mora_a_pagar = 0 where ID_PLAN = (select id_plan from SD_PRESTAMOS_MORA WHERE ID_MORA = 61);
UPDATE SD_PLAN_DE_PAGO set mora_a_pagar = 0 where ID_PLAN = (select id_plan from SD_PRESTAMOS_MORA WHERE ID_MORA = 60);
select ID_PLAN , NRO_SEMANA ,ID_PRESTAMO , DIAS_RETRASO , ESTADO from SD_PLAN_DE_PAGO order by ID_PRESTAMO desc , NRO_SEMANA desc
select ID_PRESTAMO , max(DIAS_RETRASO)  , count(1) from SD_PLAN_DE_PAGO where ESTADO = 'NUEVO' and DIAS_RETRASO > 0 group by ID_PRESTAMO

select * from SD_PLAN_DE_PAGO where DIAS_RETRASO is null;
select * from SD_PLAN_DE_PAGO where ID_PLAN = 534;
select * from SD_PRESTAMOS_POR_SOCIOS;
select * from SD_TIPOS_PRESTAMOS;
select * from SD_GESTION order by ID_GESTION desc;
delete from SD_GESTION where ID_GESTION = 4;
select * from SD_PAGO_DE_PRESTAMOS where ID_GESTION = 4;
delete from SD_PAGO_DE_PRESTAMOS where ID_GESTION = 4;
select * from SD_PRESTAMOS_POR_SOCIOS where ID_GESTION = 4;
delete from SD_PRESTAMOS_POR_SOCIOS where ID_GESTION = 4;
delete from SD_PLAN_DE_PAGO where ID_PRESTAMO in (select SD_PRESTAMOS_POR_SOCIOS.ID_PRESTAMO from SD_PRESTAMOS_POR_SOCIOS where ID_GESTION = 4)
select plan.*,
                          stp.DIAS_ESPERA_MORA,
                          STP.ID_TIPO,
                          stp.MULTA_POR_MORA,
                          TO_DATE(to_char(current_date - (1 + stp.DIAS_ESPERA_MORA), 'DD/MM/YYYY'), 'DD/MM/YYYY') -
                          plan.FECHA_PAGO as DIAS_RETRASADOS
                   from SD_PLAN_DE_PAGO plan
                            inner join SINDICATO_132.SD_PRESTAMOS_POR_SOCIOS SPPS on SPPS.ID_PRESTAMO = plan.ID_PRESTAMO
                            inner join SD_TIPOS_PRESTAMOS STP on STP.ID_TIPO = SPPS.ID_TIPO_PRESTAMO
                   where plan.ESTADO = 'NUEVO'
                     and plan.FECHA_PAGO < current_date
                   order by plan.ID_PRESTAMO  , plan.NRO_SEMANA asc;

select * from SD_PRESTAMOS_POR_SOCIOS where  numero = 3;
select * from SD_PRESTAMOS_MORA where ID_PRESTAMO = 63 and ESTADO = 'ANULADO';
select * from SD_PAGO_DE_PRESTAMOS order by ID_PAGO desc;
select * from SD_PLAN_DE_PAGO where ID_PRESTAMO = 58;

select * from SD_GESTION order by ID_GESTION desc;
delete from SD_GESTION where ID_GESTION = 5;
select * from SD_PRESTAMOS_POR_SOCIOS where ID_GESTION = 5;
delete from SD_PRESTAMOS_POR_SOCIOS where ID_GESTION = 5;
delete from SD_PLAN_DE_PAGO where ID_PRESTAMO = 68;
delete from SD_PAGO_DE_PRESTAMOS where ID_GESTION = 5;
select * from SD_PAGO_DE_PRESTAMOS where ID_GESTION = 5;
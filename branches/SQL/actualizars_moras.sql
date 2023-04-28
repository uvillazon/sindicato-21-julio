CREATE OR REPLACE PROCEDURE SINDICATO_132.P_ACT_MORAS(
    p_usr VARCHAR2,
    p_res OUT VARCHAR2
)
    IS
    v_cnt    NUMBER        := 0;
    v_res    VARCHAR2(100) := '0';
    v_numero NUMBER;
    v_errC   SD_AUX_LOG_ERRORES.cod_error%type;
    v_errD   SD_AUX_LOG_ERRORES.desc_error%type;
    v_id_log SINDICATO_132.sd_aux_log_errores.id_log%type;
    v_id     NUMBER;
    v_fecha  DATE;
BEGIN
    IF v_res = '0' THEN


        FOR x IN ( select plan.*,
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
                   order by plan.FECHA_PAGO asc)
            LOOP
                IF x.DIAS_ESPERA_MORA > 0 AND x.DIAS_RETRASADOS > 0 THEN
                    update SD_PLAN_DE_PAGO set DIAS_RETRASO = x.DIAS_RETRASADOS where ID_PLAN = x.ID_PLAN;
                    select count(1) INTO v_cnt from SD_PRESTAMOS_MORA where ID_PLAN = x.ID_PLAN AND ESTADO != 'ANULADO';
                    IF v_cnt = 0 THEN
                        INSERT INTO SINDICATO_132.SD_PRESTAMOS_MORA (ID_MORA, ID_PRESTAMO, FECHA, IMPORTE_MORA,
                                                                     OBSERVACION, FECHA_LIMITE_PAGO_MORA, FECHA_REG,
                                                                     LOGIN_USR, ESTADO, SALDO_PLAN, ID_PLAN)
                        VALUES (Q_SD_PRESTAMOS_MORA.nextval, x.ID_PRESTAMO,
                                TO_DATE(to_char(current_date, 'DD/MM/YYYY'), 'DD/MM/YYYY'), x.MULTA_POR_MORA,
                                'Mora Correspondiente a la Cuota Nro. ' || x.NRO_SEMANA ||
                                ' , GENERADO AUTOMATICAMENTE', null, current_date, 'ITF', 'NUEVO', null, x.ID_PLAN);

                        UPDATE SD_PLAN_DE_PAGO set mora_a_pagar = x.MULTA_POR_MORA WHERE ID_PLAN = x.ID_PLAN;
                    end if;
                end if;
            end loop;
        COMMIT;

    END IF;

    p_res := v_res;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        v_errC := substr(sqlcode, 1, 20);
        v_errD := substr(sqlerrm, 1, 200);
        p_grabar_error_bd(v_errC, v_errD, 'P_ACT_MORAS', 'P_ACT_MORAS', '-', '-', v_id_log);
        p_res := 'ERROR. Avise a TI. LOG generado #' || v_id_log;
END;
/

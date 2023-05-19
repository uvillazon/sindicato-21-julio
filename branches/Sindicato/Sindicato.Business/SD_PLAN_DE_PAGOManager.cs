
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Common;
using Sindicato.Common.Data;
using Sindicato.Model;
using Sindicato.Common.Data.Interfaces;
using System.Data.Objects;

namespace Sindicato.Business
{
    public class SD_PLAN_DE_PAGOManager : Repository<SD_PLAN_DE_PAGO>
    {


        public SD_PLAN_DE_PAGOManager(IUnitOfWork uow) : base(uow) { }


        public RespuestaSP GenerarPlanDePagos(int ID_PRESTAMO, string login)
        {
            RespuestaSP result = new RespuestaSP();
            try
            {
                var context = (SindicatoContext)Context;
                var pres = context.SD_PRESTAMOS_POR_SOCIOS.Where(x => x.ID_PRESTAMO == ID_PRESTAMO).FirstOrDefault();
                if (pres == null)
                {
                    result.success = false;
                    result.msg = "No existe prestamo";
                    return result;
                }
                if (pres.SD_PLAN_DE_PAGO.Count() > 0)
                {
                    result.success = false;
                    result.msg = "Existe Plan de Pagos Primero eliminar el prestamo y volvere a generar el plan de pagos";
                    return result;
                }
                decimal saldo = (decimal)pres.IMPORTE_INTERES + pres.IMPORTE_PRESTAMO;
                decimal capital = 0;
                DateTime fecha = pres.FECHA;
                decimal prestamo_interes =  pres.SEMANAS *  Math.Round( ( (pres.IMPORTE_PRESTAMO + (decimal)pres.IMPORTE_INTERES)  / pres.SEMANAS) , 2);
                decimal ajuste = (pres.IMPORTE_PRESTAMO + (decimal)pres.IMPORTE_INTERES) - prestamo_interes;
                for (int i = 1; i <= pres.SEMANAS; i++)
                {

                    SD_PLAN_DE_PAGO plan = new SD_PLAN_DE_PAGO();
                    plan.ID_PLAN = ObtenerSecuencia();
                    plan.ID_PRESTAMO = ID_PRESTAMO;
                    plan.LOGIN_USR = login;
                    plan.NRO_SEMANA = i;
                    plan.IMPORTE_A_PAGAR = Math.Round( pres.IMPORTE_PRESTAMO / pres.SEMANAS + ajuste ,2 );
                    ajuste = 0;
                    plan.INTERES_A_PAGAR = Math.Round( (decimal)pres.IMPORTE_INTERES / pres.SEMANAS ,2 );
                    saldo = saldo - Math.Round( (plan.IMPORTE_A_PAGAR + plan.INTERES_A_PAGAR) ,2);
                    if (pres.SD_TIPOS_PRESTAMOS.TIPO_INTERES == "INTERES MENSUAL")
                    {
                        fecha = fecha.AddMonths(1);
                    }
                    else {
                        fecha = fecha.AddDays(7);
                    }
                    capital = Math.Round( capital + plan.IMPORTE_A_PAGAR ,2);
                    plan.SALDO_PLAN = saldo;
                    plan.CAPITAL_A_PAGAR = capital;
                    plan.FECHA_REG = DateTime.Now;
                    plan.FECHA_PAGO = fecha;
                    plan.ESTADO = "NUEVO";
                    Add(plan);

                }
                pres.FECHA_LIMITE_PAGO = fecha;
                pres.ESTADO = "CON_PLAN_PAGOS";
                Save();
                result.success = true;
                result.msg = "proceso Ejectuado correctamente";
                result.id = pres.ID_PRESTAMO;
            }
            catch (Exception e)
            {

                result.success = false;
                result.msg = e.Message.ToString();
            }

            return result;
        }


    }
}

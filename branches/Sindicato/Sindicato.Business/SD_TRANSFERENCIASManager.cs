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
    public class SD_TRANSFERENCIASManager : Repository<SD_TRANSFERENCIAS>
    {


        public SD_TRANSFERENCIASManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarTransferencia(SD_TRANSFERENCIAS ing, string login)
        {
            try
            {
                string result = "";
                if (ing.ID_TRANSFERENCIA == 0)
                {
                    var context = (SindicatoContext)Context;
                    string monedacajaorigen = context.SD_CAJAS.Where(x => x.ID_CAJA == ing.ID_CAJA_ORIGEN).FirstOrDefault().MONEDA;
                    string monedacajadestino = context.SD_CAJAS.Where(x => x.ID_CAJA == ing.ID_CAJA_DESTINO).FirstOrDefault().MONEDA;
                    if(!monedacajadestino.Equals(monedacajaorigen)){
                    return    result = string.Format("No puede realizar la transferencia por que cada caja es de diferente moneda");
                    
                    }
                    var saldoOrigen = context.SD_CAJAS.Where(x => x.ID_CAJA == ing.ID_CAJA_ORIGEN).FirstOrDefault().SALDO;
                    if (ing.IMPORTE > saldoOrigen)
                    {
                        result = string.Format("No puede Retirar mas que su saldo. Saldo Disponible : {0} , Importe a Transferir : {1}", saldoOrigen,ing.IMPORTE);
                    }
                    else
                    {

                        ing.FECHA_REG = DateTime.Now;
                        ing.LOGIN = login;
                        ing.ESTADO = "NUEVO";
                        ing.ID_TRANSFERENCIA = ObtenerSecuencia();
                        ing.NRO_RECIBO = ing.ID_TRANSFERENCIA;
                        Add(ing);

                        ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                        context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                        int idKardexEgreso = Convert.ToInt32(p_RES.Value);
                        context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                        int idKardexIngreso = Convert.ToInt32(p_RES.Value);
                        SD_KARDEX_EFECTIVO kardexEgreso = new SD_KARDEX_EFECTIVO()
                        {
                            ID_KARDEX = idKardexEgreso,
                            DETALLE = ing.CONCEPTO,
                            FECHA = (DateTime)ing.FECHA,
                            FECHA_REG = DateTime.Now,
                            ID_OPERACION = ing.ID_TRANSFERENCIA,
                            ID_CAJA = ing.ID_CAJA_ORIGEN,
                            EGRESO = ing.IMPORTE,
                            LOGIN = ing.LOGIN,
                            
                            OPERACION = "TRANSFERENCIAS"
                        };
                        SD_KARDEX_EFECTIVO kardexIngreso = new SD_KARDEX_EFECTIVO()
                        {
                            ID_KARDEX = idKardexIngreso,
                            DETALLE = ing.CONCEPTO,
                            FECHA = (DateTime)ing.FECHA,
                            FECHA_REG = DateTime.Now,
                            ID_OPERACION = ing.ID_TRANSFERENCIA,
                            ID_CAJA = ing.ID_CAJA_DESTINO,
                            INGRESO = ing.IMPORTE,
                            LOGIN = ing.LOGIN,
                            OPERACION = "TRANSFERENCIAS"
                        };
                        context.SD_KARDEX_EFECTIVO.AddObject(kardexEgreso);
                        context.SD_KARDEX_EFECTIVO.AddObject(kardexIngreso);
                        Save();

                        context.P_SD_ACT_KARDEX_EFECTIVO(ing.ID_CAJA_ORIGEN,ing.FECHA,0,p_RES);
                        context.P_SD_ACT_KARDEX_EFECTIVO(ing.ID_CAJA_DESTINO, ing.FECHA, 0, p_RES);
                        result = ing.ID_TRANSFERENCIA.ToString();
                    }
                }
                else
                {
                    result = "No se puede Editar un Egreso. Es necesario Eliminar el Retiro Primero";
                }
                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }

    }
}

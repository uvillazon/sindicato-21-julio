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
    public class SD_RETIRO_SOCIO_MOVILManager : Repository<SD_RETIRO_SOCIO_MOVIL>
    {


        public SD_RETIRO_SOCIO_MOVILManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarRetiro(SD_RETIRO_SOCIO_MOVIL ing, string login)
        {
            try
            {
                string result = "";
                if (ing.ID_RETIRO == 0)
                {
                    var context = (SindicatoContext)Context;
                    var saldo = context.SD_SOCIO_MOVILES.Where(x => x.ID_SOCIO_MOVIL == ing.ID_SOCIO_MOVIL).FirstOrDefault().SALDO;
                    var saldos = context.SD_DETALLE_CIERRES_AHORRO.Where(x=>x.ID_SOCIO_MOVIL == ing.ID_SOCIO_MOVIL && (x.TOTAL_AHORRO - x.TOTAL_CANCELADO) > 0).OrderBy(y=> y.FECHA_REG);
                    if (ing.RETIRO > saldo)
                    {
                        result = string.Format("No puede Retirar mas que su saldo. Saldo Disponible : {0}", saldo);
                    }
                    else
                    {
                        ing.FECHA_REG = DateTime.Now;
                        ing.LOGIN = login;
                        ing.ID_RETIRO = ObtenerSecuencia();
                        ing.ESTADO = "NUEVO";
                        Add(ing);
                        ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                        var total = ing.RETIRO;
                        foreach (var item in saldos)
                        {
                            var detalle = new SD_RETIRO_SOCIO_MOVIL_DETALLE();
                            context.P_EE_SECUENCIA("SD_RETIRO_SOCIO_M_DETALLE", 0, p_RES);
                            int iddetalle = Convert.ToInt32(p_RES.Value);
                            detalle.ID_DETALLE = iddetalle;
                            detalle.ID_RETIRO = ing.ID_RETIRO;
                            detalle.ID_DETALLE_CIERRE = item.ID_DETALLE;
                            detalle.LOGIN = login;
                            detalle.FECHA_REG = DateTime.Now;
                            if (total >= (item.TOTAL_AHORRO -item.TOTAL_CANCELADO ))
                            {
                                detalle.OBSERVACION = item.OBSERVACION;
                                detalle.RETIRO = (decimal)(item.TOTAL_AHORRO - item.TOTAL_CANCELADO);
                                total = total - detalle.RETIRO;
                            }
                            else
                            {
                                detalle.OBSERVACION = item.OBSERVACION;
                                detalle.RETIRO = total;
                                total = 0;
                            }
                            context.SD_RETIRO_SOCIO_MOVIL_DETALLE.AddObject(detalle);
                            Save();
                            if (total == 0)
                            {
                                break;
                            }



                        }

                        
                        context.P_EE_SECUENCIA("SD_KARDEX_SOCIO_MOVIL", 0, p_RES);
                        int idKardex = Convert.ToInt32(p_RES.Value);
                        SD_KARDEX_SOCIO_MOVIL kardex = new SD_KARDEX_SOCIO_MOVIL()
                        {
                            ID_KARDEX = idKardex,
                            DETALLE = ing.OBSERVACION,
                            FECHA = (DateTime)ing.FECHA,
                            FECHA_REG = DateTime.Now,
                            ID_OPERACION = ing.ID_RETIRO,
                            ID_SOCIO_MOVIL = ing.ID_SOCIO_MOVIL,
                            EGRESO = ing.RETIRO,
                            LOGIN = ing.LOGIN,
                            OPERACION = "RETIRO DE AHORRO"
                        };
                        context.SD_KARDEX_SOCIO_MOVIL.AddObject(kardex);
                        Save();

                        context.P_SD_ACT_KARDEX_SOCIO_MOVIL(ing.ID_SOCIO_MOVIL, ing.FECHA, login, p_RES);
                        context.P_SD_ACT_PAGOS_SOCIOS(ing.ID_SOCIO_MOVIL, login, p_RES);


                        context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                        int idKardexEfectivo = Convert.ToInt32(p_RES.Value);
                        var socio = context.SD_SOCIO_MOVILES.Where(x=>x.ID_SOCIO_MOVIL == ing.ID_SOCIO_MOVIL).FirstOrDefault();
                        SD_KARDEX_EFECTIVO kardexEfe = new SD_KARDEX_EFECTIVO()
                        {
                            ID_KARDEX = idKardexEfectivo,
                            DETALLE =string.Format("PAGO  DE AHORRO  Movil {0}: {1}", socio.SD_MOVILES.NRO_MOVIL ,socio.ObtenerNombreSocio()),
                            FECHA = (DateTime)ing.FECHA,
                            FECHA_REG = DateTime.Now,
                            ID_OPERACION = ing.ID_RETIRO,
                            ID_CAJA = ing.ID_CAJA,
                            EGRESO = ing.RETIRO,
                            LOGIN = ing.LOGIN,
                            OPERACION = "RETIRO DE AHORRO"
                        };
                        context.SD_KARDEX_EFECTIVO.AddObject(kardexEfe);
                        Save();

                        context.P_SD_ACT_KARDEX_EFECTIVO(ing.ID_CAJA, ing.FECHA, 1, p_RES);

                        result = ing.ID_RETIRO.ToString();
                    }
                }
                else
                {
                    result = "No se puede Editar un Retiro. Es necesario Eliminar el Retiro Primero";
                }
                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }

        //test

    }
}

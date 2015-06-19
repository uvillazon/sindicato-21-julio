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
    public class SD_DESCUENTOSManager : Repository<SD_DESCUENTOS>
    {


        public SD_DESCUENTOSManager(IUnitOfWork uow) : base(uow) { }

        public string GuardarDescuento(SD_DESCUENTOS ant, string login)
        {
            try
            {
                string result = "";
                if (ant.ID_DESCUENTO == 0)
                {
                    ant.ID_DESCUENTO = ObtenerSecuencia();
                    ant.LOGIN = login;
                    ant.FECHA_REG = DateTime.Now;
                    ant.ESTADO = "NUEVO";
                    Add(ant);
                    Save();
                    result = ant.ID_DESCUENTO.ToString();
                    return result;
                }
                else
                {
                    var antActual = BuscarTodos(x => x.ID_DESCUENTO == ant.ID_DESCUENTO).FirstOrDefault();
                    if (antActual != null)
                    {
                        if (antActual.ESTADO == "NUEVO")
                        {
                            antActual.DESCUENTO = ant.DESCUENTO;
                            antActual.TOTAL = ant.TOTAL;
                            antActual.FECHA = ant.FECHA;
                            antActual.DESCRIPCION = ant.DESCRIPCION;
                            Save();
                            result = antActual.ID_DESCUENTO.ToString();
                        }
                        else
                        {
                            result = string.Format("No puedo Modificar en Estado : {0} , es permitido modificar en estado NUEVO", antActual.ESTADO);
                        }
                    }
                    else
                    {
                        result = "No Existe ese Antecedente";
                    }
                    return result;
                }

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }
        public string ActualizarTotal(int ID_DESCUENTO)
        {
            try
            {
                string result = "";

                var antActual = BuscarTodos(x => x.ID_DESCUENTO == ID_DESCUENTO).FirstOrDefault();
                if (antActual != null)
                {
                    var total = antActual.SD_DESCUENTOS_SOCIO.Sum(x => x.IMPORTE);
                    antActual.TOTAL = total;
                    Save();
                    result = total.ToString();
                }
                else
                {
                    result = "No Existe ese Antecedente";
                }
                return result;

            }
            catch (Exception e)
            {
                return e.ToString();
                //throw;
            }
        }
        public string AprobarAnularDebitoDescuento(int ID_DESCUENTO, string ACCION, string OBSERVACION, int? ID_CAJA, string login)
        {
            try
            {
                string result = "";
                var context = (SindicatoContext)Context;
                var desc = BuscarTodos(x => x.ID_DESCUENTO == ID_DESCUENTO).FirstOrDefault();
                if (desc != null)
                {
                    if (ACCION == "ANULADO" || ACCION == "APROBADO")
                    {
                        if (desc.ESTADO == "NUEVO")
                        {
                            desc.ESTADO = ACCION;
                            desc.LOGIN_APROBADO = ACCION == "APROBADO" ? login : null;
                            desc.FECHA_APROBADO = ACCION == "APROBADO" ? (DateTime?)DateTime.Now : null;
                            desc.FECHA_DEBITO = ACCION == "DEBITADO" ? (DateTime?)DateTime.Now : null;
                            desc.LOGIN_DEBITO = ACCION == "DEBITADO" ? login : null;
                            desc.OBSERV_APROBOADO = ACCION == "APROBADO" ? OBSERVACION : null;
                            desc.OBSERV_DEBITO = ACCION == "DEBITADO" ? OBSERVACION : null;
                            result = desc.ID_DESCUENTO.ToString();
                            Save();

                        }
                        else
                        {
                            result = "Descuento en estado INADECUADO";
                        }
                    }
                    else
                    {
                        if (desc.ESTADO == "APROBADO")
                        {
                            var caja = context.SD_CAJAS.Where(x => x.ID_CAJA == ID_CAJA).FirstOrDefault();
                            if (caja == null)
                            {
                                result = string.Format("No Existe la Caja");
                            }
                            else
                            {
                                if (caja.SALDO < desc.TOTAL)
                                {
                                    result = string.Format("la Caja : {0} , no cuenta con saldo suficiente. Saldo Actual : {1} , importe a Descontar : {2}", caja.NOMBRE, caja.SALDO, desc.TOTAL);
                                }
                                else
                                {
                                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                                    context.P_EE_SECUENCIA("SD_KARDEX_EFECTIVO", 0, p_RES);
                                    var idKardex = Convert.ToInt32(p_RES.Value);
                                    var kardex = new SD_KARDEX_EFECTIVO()
                                    {
                                        ID_KARDEX = idKardex,
                                        DETALLE = desc.DESCUENTO,
                                        EGRESO = desc.TOTAL,
                                        FECHA = DateTime.Today,
                                        FECHA_REG = DateTime.Now,
                                        ID_CAJA = (int)ID_CAJA,
                                        ID_OPERACION = desc.ID_DESCUENTO,
                                        OPERACION = "DESCUENTO",
                                        LOGIN = login
                                    };
                                    context.SD_KARDEX_EFECTIVO.AddObject(kardex);
                                    desc.ESTADO = ACCION;
                                    desc.LOGIN_APROBADO = ACCION == "APROBADO" ? login : null;
                                    desc.FECHA_APROBADO = ACCION == "APROBADO" ? (DateTime?)DateTime.Now : null;
                                    desc.FECHA_DEBITO = ACCION == "DEBITADO" ? (DateTime?)DateTime.Now : null;
                                    desc.LOGIN_DEBITO = ACCION == "DEBITADO" ? login : null;
                                    desc.OBSERV_APROBOADO = ACCION == "APROBADO" ? OBSERVACION : null;
                                    desc.OBSERV_DEBITO = ACCION == "DEBITADO" ? OBSERVACION : null;
                                    Save();
                                    context.P_SD_ACT_KARDEX_EFECTIVO(ID_CAJA, DateTime.Today, 1, p_RES);
                                    result = desc.ID_DESCUENTO.ToString();
                                }

                            }

                        }
                        else
                        {
                            result = "Descuento en estado INADECUADO";
                        }
                    }
                }
                else
                {
                    result = "No existe el Descuento.";
                }
                return result;
            }
            catch (Exception e)
            {

                return e.ToString();
            }

        }
        //test

    }
}


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
    public class SD_SOCIO_MOVIL_AUTOSManager : Repository<SD_SOCIO_MOVIL_AUTOS>
    {


        public SD_SOCIO_MOVIL_AUTOSManager(IUnitOfWork uow) : base(uow) { }


        public string GuardarSocioMovilAuto(SD_SOCIO_MOVIL_AUTOS soc, int DIAS, string login)
        {
            try
            {
                string result = "";
                var verificar = BuscarTodos(x => x.ID_AUTO == soc.ID_AUTO && x.ESTADO == "ACTIVO");
                if (verificar.Count() > 0)
                {
                    result = string.Format("El auto no puede ser Asociado al Socio por que existe otro SOCIO que lo esta utilizando");
                }
                else
                {
                    if (soc.TIPO == "PRINCIPAL")
                    {
                        var socioMovil = BuscarTodos(x => x.ID_SOCIO_MOVIL == soc.ID_SOCIO_MOVIL && x.TIPO == "PRINCIPAL");
                        if (socioMovil.Count() > 0)
                        {
                            foreach (var item in socioMovil)
                            {
                                item.ESTADO = "INACTIVO";
                                item.FECHA_BAJA = soc.FECHA_ALTA;
                                item.MOTIVO_BAJA = "se dio de ALTA otro MOVIL";
                                item.LOGIN_BAJA = login;

                            }

                        }
                        soc.ID_SOCIO_MOVIL_AUTO = ObtenerSecuencia();
                        soc.LOGIN_ALTA = login;
                        soc.TIPO = "PRINCIPAL";
                        soc.FECHA_REG = DateTime.Now;
                        soc.ESTADO = "ACTIVO";
                        //movil.ID_MOVIL = ObtenerSecuencia();

                        Add(soc);

                        result = soc.ID_SOCIO_MOVIL_AUTO.ToString();
                    }
                    else
                    {
                        var socioMovil = BuscarTodos(x => x.ID_SOCIO_MOVIL == soc.ID_SOCIO_MOVIL && x.TIPO == "REEMPLAZO");
                        if (socioMovil.Count() > 0)
                        {
                            foreach (var item in socioMovil)
                            {
                                item.ESTADO = "INACTIVO";
                                item.FECHA_BAJA = soc.FECHA_ALTA;
                                item.MOTIVO_BAJA = "se dio de ALTA otro MOVIL de REEMPLAZO";
                                item.LOGIN_BAJA = login;

                            }

                        }
                        soc.ID_SOCIO_MOVIL_AUTO = ObtenerSecuencia();
                        soc.LOGIN_ALTA = login;
                        soc.TIPO = "REEMPLAZO";
                        soc.FECHA_BAJA = soc.FECHA_ALTA.AddDays(DIAS);
                        soc.MOTIVO_BAJA = string.Format("se coloca en baja luego de {0} Dias por que solo es auto temporal", DIAS);
                        soc.LOGIN_BAJA = login;
                        soc.FECHA_REG = DateTime.Now;
                        soc.ESTADO = "ACTIVO";
                        //movil.ID_MOVIL = ObtenerSecuencia();

                        Add(soc);

                        result = soc.ID_SOCIO_MOVIL_AUTO.ToString();
                    }

                    Save();
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sindicato.Services.Interfaces;
using Sindicato.Common;
using Sindicato.Model;
using Sindicato.Services.Model;
using System.Linq.Dynamic;
using LinqKit;
using Sindicato.Business;
using System.Linq.Expressions;
using System.Data.Objects;

namespace Sindicato.Services
{
    public class SociosServices : BaseService, ISociosServices
    {
        //private ISD_LISTASManager _manListas;

        public SociosServices(/*ISD_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }



        public IEnumerable<SD_SOCIO_MOVILES> ObtenerSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_SOCIO_MOVILES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_MOVILESManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;


                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    //result = result.Where(SD_SOCIOS
                    result = result.Where(SD_SOCIO_MOVILES.Contiene(filtros.Contiene));

                }

                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
        public IEnumerable<SD_SOCIOS> ObtenerSoloSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_SOCIOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;


                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    result = result.Where(SD_SOCIOS.Contiene(filtros.Contiene));
                }

                if (!string.IsNullOrEmpty(filtros.codigo))
                {
                    switch (filtros.codigo)
                    {
                        case "SIN MOVIL":
                            result = result.Where(x => x.SD_SOCIO_MOVILES.Count() == 0);
                            break;
                        case "CON MOVIL":
                            result = result.Where(x => x.SD_SOCIO_MOVILES.Count() > 0);
                            break;
                        default:
                            break;
                    }
                }
                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }




        public RespuestaSP GuardarSocio(SD_SOCIOS socio, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_ALTA_SD_SOCIOS(socio.ID_SOCIO, socio.NOMBRE, socio.APELLIDO_PATERNO, socio.APELLIDO_MATERNO, socio.NRO_LICENCIA, socio.CATEGORIA_LIC, socio.CI, socio.EXPEDIDO, socio.FECHA_NAC, socio.FECHA_INGRESO, socio.DOMICILIO, socio.OBSERVACION, socio.TELEFONO, socio.CELULAR, socio.ESTADO_CIVIL, ID_USR, p_res);
                int idsocio;
                bool esNumero = int.TryParse(p_res.Value.ToString(), out idsocio);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = idsocio;
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });

            return result;
        }
        public RespuestaSP GuardarSocioMovil(SD_SOCIO_MOVILES socio, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_GRABAR_SOCIO_MOVILES(socio.ID_SOCIO_MOVIL, socio.ID_SOCIO, socio.ID_MOVIL, socio.DESCRIPCION, socio.TIPO_MOVIL, socio.FECHA_ALTA, socio.FECHA_BAJA, socio.OBSERVACION, ID_USR, socio.ESTADO, p_res);
                int idsocio;
                bool esNumero = int.TryParse(p_res.Value.ToString(), out idsocio);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = idsocio;
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });

            return result;
        }

        public RespuestaSP BajaSocioMovil(SD_SOCIO_MOVILES movil, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var mnMovil = new SD_SOCIO_MOVILESManager(uow);
                result = mnMovil.BajaSocioMovil(movil, ID_USR);
            });

            return result;
        }

        public RespuestaSP GuardarNuevoSocioMovilPrimario(SD_SOCIO_MOVILES socio, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var mnMovil = new SD_MOVILESManager(uow);
                var mnSocioMovil = new SD_SOCIO_MOVILESManager(uow);
                var movil = mnMovil.GuardarMovil(new SD_MOVILES() { ID_LINEA = 1, DESCRIPCION = socio.DESCRIPCION, ESTADO = "ACTIVO", FECHA_ALTA = socio.FECHA_ALTA, OBSERVACION = socio.OBSERVACION, NRO_MOVIL = socio.NRO_MOVIL }, ID_USR.ToString());
                int idMovil;
                bool esNumero = int.TryParse(movil, out idMovil);
                if (esNumero)
                {
                    socio.ID_MOVIL = idMovil;
                    var socioMovil = mnSocioMovil.GuardarMovilSocio(socio, ID_USR);
                    int idSocioMovil;
                    esNumero = int.TryParse(socioMovil, out idSocioMovil);
                    if (esNumero)
                    {
                        result.success = true;
                        result.msg = "Proceso Ejecutado Correctamente";
                        result.id = idMovil;
                    }
                    else
                    {
                        result.success = false;
                        result.msg = socioMovil;
                        var mov = mnMovil.BuscarTodos(x => x.ID_MOVIL == idMovil).FirstOrDefault();
                        mnMovil.Delete(mov);
                    }
                }
                else
                {
                    result.success = false;
                    result.msg = movil;
                }

            });

            return result;
        }
        public SD_SOCIOS ObtenerSocioPorCriterio(Expression<Func<SD_SOCIOS, bool>> criterio)
        {
            SD_SOCIOS result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIOSManager(uow);

                result = manager.BuscarTodos(criterio).FirstOrDefault();


            });
            return result;
        }

        public SD_SOCIO_MOVILES ObtenerSocioMovilPorCriterio(Expression<Func<SD_SOCIO_MOVILES, bool>> criterio)
        {
            SD_SOCIO_MOVILES result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_MOVILESManager(uow);

                result = manager.BuscarTodos(criterio).FirstOrDefault();


            });
            return result;
        }

        public IEnumerable<SD_SOCIO_MOVILES> ObtenerSociosMoviles(Expression<Func<SD_SOCIO_MOVILES, bool>> criterio = null)
        {
            IQueryable<SD_SOCIO_MOVILES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_MOVILESManager(uow);
                result = manager.BuscarTodos(criterio);
            });
            return result;
        }


        public IEnumerable<SD_SOCIO_MOVIL_AUTOS> ObtenerAutosSocioPaginado(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_SOCIO_MOVIL_AUTOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_MOVIL_AUTOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    result = result.Where(x => x.TIPO.ToUpper().Contains(filtros.Contiene.ToUpper()));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public RespuestaSP GuardarAutos(SD_AUTOS auto, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            //ExecuteManager(uow =>
            //{
            //    var context = (SindicatoContext)uow.Context;
            //    ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
            //    context.P_SD_ALTA_AUTOS(auto.ID_AUTO, auto.ID_MOVIL, auto.TIPO, auto.COLOR, auto.MARCA, auto.MODELO, auto.PLACA, auto.MOTOR, auto.CHASIS, auto.DESCRIPCION, auto.FECHA_ALTA, auto.FECHA_BAJA, auto.MOTIVO_CAMBIO, ID_USR, p_res);
            //    int idsocio;
            //    bool esNumero = int.TryParse(p_res.Value.ToString(), out idsocio);
            //    if (esNumero)
            //    {
            //        result.success = true;
            //        result.msg = "Proceso Ejecutado Correctamente";
            //        result.id = idsocio;
            //    }
            //    else
            //    {
            //        result.success = false;
            //        result.msg = p_res.Value.ToString();
            //    }

            //});

            return result;
        }

        public IEnumerable<SD_OBLIGACIONES_SOCIO> ObtenerObligaciones(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_OBLIGACIONES_SOCIO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_OBLIGACIONES_SOCIOManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
        public IEnumerable<SD_KARDEX_OBLIGACION> ObtenerKardexObligaciones(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_KARDEX_OBLIGACION> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_KARDEX_OBLIGACIONManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarObligacion(SD_KARDEX_OBLIGACION kardex, int ID_SOCIO, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_ACT_OBLIGACIONES(ID_SOCIO, kardex.ID_OBLIGACION, kardex.FECHA, kardex.MOTIVO, kardex.IMPORTE_NUEVO, login, p_res);
                int idsocio;
                bool esNumero = int.TryParse(p_res.Value.ToString(), out idsocio);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = idsocio;
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });

            return result;
        }





        public RespuestaSP GuardarSocioMovilAuto(SD_SOCIO_MOVIL_AUTOS soc, int DIAS, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var managerSocioMovilAuto = new SD_SOCIO_MOVIL_AUTOSManager(uow);
                var socio = managerSocioMovilAuto.GuardarSocioMovilAuto(soc, DIAS, login);
                int idSocioMovilAuto;
                bool esNumero = int.TryParse(socio, out idSocioMovilAuto);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = idSocioMovilAuto;
                }
                else
                {
                    result.success = false;
                    result.msg = socio;
                }

            });

            return result;
        }

        #region Kardex Socio Movil Ingresos , Egresos
        public IEnumerable<SD_KARDEX_SOCIO> ObtenerKardexSociosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_KARDEX_SOCIO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_KARDEX_SOCIOManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
        public IEnumerable<SD_KARDEX_SOCIO_MOVIL> ObtenerKardexSociosMovilPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_KARDEX_SOCIO_MOVIL> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_KARDEX_SOCIO_MOVILManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }
        #endregion
        #region Ingresos Socio Eliminar , Crear , listado y por criterio
        public RespuestaSP GuardarIngresoSocio(SD_INGRESOS_SOCIO ingreso, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_INGRESOS_SOCIOManager(uow);
                var ing = manager.GuardarIngreso(ingreso, login);
                int id;
                bool esNumero = int.TryParse(ing, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = ing;
                }

            });

            return result;
        }

        public RespuestaSP EliminarIngresoSocio(int ID_INGRESO)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_INGRESOS_SOCIOManager(uow);
                var context = (SindicatoContext)manager.Context;
                var ant = manager.BuscarTodos(x => x.ID_INGRESO == ID_INGRESO).FirstOrDefault();
                if (ant != null)
                {
                    manager.Delete(ant);
                    var kardex = context.SD_KARDEX_SOCIO.Where(x => x.OPERACION == "INGRESOS" && x.ID_OPERACION == ant.ID_INGRESO && x.ID_SOCIO == ant.ID_SOCIO);
                    foreach (var item in kardex)
                    {
                        context.SD_KARDEX_SOCIO.DeleteObject(item);
                    }
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    manager.Save();
                    context.P_SD_ACT_KARDEX_SOCIO(ant.ID_SOCIO, ant.FECHA, ant.LOGIN, p_RES);
                    result.success = true;
                    result.msg = "Se elimino Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            return result;
        }
        public IEnumerable<SD_INGRESOS_SOCIO> ObtenerIngresosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_INGRESOS_SOCIO> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_INGRESOS_SOCIOManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public SD_INGRESOS_SOCIO ObtenerIngresosPorCriterio(Expression<Func<SD_INGRESOS_SOCIO, bool>> criterio)
        {
            SD_INGRESOS_SOCIO result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_INGRESOS_SOCIOManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();
            });
            return result;
        }
        #endregion




        #region Retiros Obtener , Listar Crear Eliminar
        public IEnumerable<SD_RETIRO_SOCIO_MOVIL> ObtenerRetirosPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_RETIRO_SOCIO_MOVIL> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_RETIRO_SOCIO_MOVILManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    result = result.Where(SD_RETIRO_SOCIO_MOVIL.Contiene(filtros.Contiene.ToUpper()));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public SD_RETIRO_SOCIO_MOVIL ObtenerRetiroPorCriterio(Expression<Func<SD_RETIRO_SOCIO_MOVIL, bool>> criterio)
        {
            SD_RETIRO_SOCIO_MOVIL result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_RETIRO_SOCIO_MOVILManager(uow);
                result = manager.BuscarTodos(criterio).FirstOrDefault();
            });
            return result;
        }

        public RespuestaSP GuardarRetiroSocio(SD_RETIRO_SOCIO_MOVIL ingreso, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_RETIRO_SOCIO_MOVILManager(uow);
                var ing = manager.GuardarRetiro(ingreso, login);
                int id;
                bool esNumero = int.TryParse(ing, out id);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = id;
                }
                else
                {
                    result.success = false;
                    result.msg = ing;
                }

            });

            return result;
        }

        public RespuestaSP EliminarRetiroSocio(int ID_RETIRO)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_RETIRO_SOCIO_MOVILManager(uow);
                var context = (SindicatoContext)manager.Context;
                var ant = manager.BuscarTodos(x => x.ID_RETIRO == ID_RETIRO).FirstOrDefault();
                if (ant != null)
                {
                    manager.Delete(ant);
                    var kardex = context.SD_KARDEX_SOCIO_MOVIL.Where(x => x.OPERACION == "RETIRO DE AHORRO" && x.ID_OPERACION == ant.ID_RETIRO && x.ID_SOCIO_MOVIL == ant.ID_SOCIO_MOVIL);
                    foreach (var item in kardex)
                    {
                        context.SD_KARDEX_SOCIO_MOVIL.DeleteObject(item);
                    }
                    ObjectParameter p_RES = new ObjectParameter("p_res", typeof(Int32));
                    manager.Save();
                    context.P_SD_ACT_KARDEX_SOCIO_MOVIL(ant.ID_SOCIO_MOVIL, ant.FECHA, ant.LOGIN, p_RES);

                    var kardexEfe = context.SD_KARDEX_EFECTIVO.Where(x => x.OPERACION == "RETIRO DE AHORRO" && x.ID_OPERACION == ant.ID_RETIRO && x.ID_CAJA == ant.ID_CAJA);
                    foreach (var item in kardexEfe)
                    {
                        context.SD_KARDEX_EFECTIVO.DeleteObject(item);
                    }
                    manager.Save();
                    context.P_SD_ACT_KARDEX_EFECTIVO(ant.ID_CAJA, ant.FECHA, 1, p_RES);


                    result.success = true;
                    result.msg = "Se elimino Correctamente";
                }
                else
                {
                    result.success = false;
                    result.msg = "Ocurrio algun Problema";
                }
            });
            return result;
        }
        #endregion

        #region detalles hojas obligaciones
        public RespuestaSP GuardarSocioMovilObligacion(SD_SOC_MOV_OBLIG socio, string LOGIN)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_SOC_MOV_OBLIGManager(uow);
                string res = "";
                if (socio.ID_SOC_MOV_OBLIG != 0)
                {
                    res = manager.EditarObligacionPorSocio(socio, LOGIN);
                }
                else
                {
                    res = manager.GuardarObligacionPorSocio(socio, LOGIN);
                }
                //var
                int idsocio;
                bool esNumero = int.TryParse(res.ToString(), out idsocio);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = idsocio;
                }
                else
                {
                    result.success = false;
                    result.msg = res.ToString();
                }

            });

            return result;
        }
        #endregion


        public IEnumerable<SD_SOC_MOV_OBLIG> ObtenerConfigHojasPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_SOC_MOV_OBLIG> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOC_MOV_OBLIGManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            });
            return result;
        }


        public IEnumerable<SD_OBLIGACIONES_HOJA> ObtenerObligacionesHojasPaginados(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_OBLIGACIONES_HOJA> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_OBLIGACIONES_HOJAManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);
            });
            return result;
        }


        public RespuestaSP EliminarSocio(int ID_SOCIO, string LOGIN)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_ELIMINAR_SOCIO(ID_SOCIO, p_res);
                int idsocio;
                bool esNumero = int.TryParse(p_res.Value.ToString(), out idsocio);
                if (esNumero)
                {
                    result.success = true;
                    result.msg = "Proceso Ejecutado Correctamente";
                    result.id = idsocio;
                }
                else
                {
                    result.success = false;
                    result.msg = p_res.Value.ToString();
                }

            });

            return result;
        }

        #region Transferencias de Hojas entre Socios Antiguo y Nuevo
        public IEnumerable<SD_TRANSFERENCIAS_HOJAS> ObtenerTransferenciasHojasPaginado(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_TRANSFERENCIAS_HOJAS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_TRANSFERENCIAS_HOJASManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    var contiene = filtros.Contiene.Trim().ToUpper();
                    result = result.Where(SD_TRANSFERENCIAS_HOJAS.Contiene(contiene));

                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public RespuestaSP GuardarTransferenciaHojas(SD_TRANSFERENCIAS_HOJAS data, string login)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var repo = new SD_TRANSFERENCIAS_HOJASManager(uow);
                var respuesta = repo.GuardarTransferencia(data, login);

                int id;
                bool esNumero = int.TryParse(respuesta, out id);
                result.success = esNumero;
                result.msg = esNumero ? "Proceso Ejecutado Correctamente" : respuesta;
                result.id = id;

            });
            return result;

        }

        public RespuestaSP AnularTransferenciaHoja(int ID_TRANSF)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var repo = new SD_TRANSFERENCIAS_HOJASManager(uow);
                var respuesta = repo.AnularTransferenciaHojas(ID_TRANSF);
                int id;
                bool esNumero = int.TryParse(respuesta, out id);
                result.success = esNumero;
                result.msg = esNumero ? "Proceso Ejecutado Correctamente" : respuesta;
                result.id = id;

            });
            return result;

        }

        public RespuestaSP VerificarHojasDeSocio(int ID_SOCIO_MOVIL)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_HOJAS_CONTROLManager(uow);
                var hojas = manager.BuscarTodos(x => x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL && x.ESTADO == "NUEVO");
                result.success = hojas.Count() > 0 ? false : true;
                result.msg = hojas.Count() > 0 ? "El movil seleccionado cuenta con hoja(s). Seleccione otro movil sin hojas activas" : "proceso ejecutado correctamente";
            });
            return result;

        }
        public RespuestaSP ObtenerResumenDeHojas(int ID_SOCIO_MOVIL)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_MOVILESManager(uow);
                var managerHojas = new SD_DETALLES_HOJAS_CONTROLManager(uow);
                var socio = manager.BuscarTodos(x => x.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL).FirstOrDefault();
                if (socio == null)
                {
                    result.success = false;
                    result.msg = "No Existe el Movil";
                }
                else
                {
                    var hojas = managerHojas.BuscarTodos(x => x.SD_HOJAS_CONTROL.ESTADO == "NUEVO" && x.SD_HOJAS_CONTROL.ID_SOCIO_MOVIL == ID_SOCIO_MOVIL);
                    if (hojas.Count() > 0)
                    {
                        decimal? total = 0;
                        decimal? total_ahorro = 0;
                        foreach (var item in hojas)
                        {
                            total = total + item.IMPORTE;
                            if (item.OBLIGACION == "AHORRO")
                            {
                                total_ahorro = total_ahorro + item.IMPORTE;
                            }
                        }
                        result.success = true;
                        result.msg = "Proceso Ejectuado Correctamenet";
                        result.data = new
                        {
                            NRO_MOVIL = socio.SD_MOVILES.NRO_MOVIL,
                            SOCIO = socio.SD_SOCIOS.ObtenerNombreSocio(),
                            CANTIDAD = hojas.GroupBy(x => x.ID_HOJA).Count(),
                            IMPORTE_TOTAL = total,
                            IMPORTE_AHORRRO = total_ahorro
                        };
                    }
                    else
                    {
                        result.success = false;
                        result.msg = string.Format("El movil : {0} no cuenta con Hojas Activas", socio.SD_MOVILES.NRO_MOVIL);
                    }
                }


            });
            return result;
        }
        #endregion
    }
}

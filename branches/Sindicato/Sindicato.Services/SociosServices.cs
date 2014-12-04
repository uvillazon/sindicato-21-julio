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

                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_DOCUMENTACIONES> ObtenerSocioDocumentacionesPaginado(PagingInfo paginacion)
        {
            IQueryable<SD_DOCUMENTACIONES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_DOCUMENTACIONESManager(uow);

                result = manager.BuscarTodos();

                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_SOCIO_DESEMPENOS> ObtenerSocioDesempenosPaginado(PagingInfo paginacion)
        {
            IQueryable<SD_SOCIO_DESEMPENOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_SOCIO_DESEMPENOSManager(uow);

                result = manager.BuscarTodos();

                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public IEnumerable<SD_ANTECEDENTES> ObtenerSocioAntecedentesPaginado(PagingInfo paginacion)
        {
            IQueryable<SD_ANTECEDENTES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_ANTECEDENTESManager(uow);

                result = manager.BuscarTodos();

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

        public RespuestaSP GuardarSocioDocumento(SD_DOCUMENTACIONES doc, int ID_USR)
        {
            throw new NotImplementedException();
        }

        public RespuestaSP GuardarSocioDesempeno(SD_SOCIO_DESEMPENOS des, int ID_USR)
        {
            throw new NotImplementedException();
        }

        public RespuestaSP GuardarSocioAntecedente(SD_ANTECEDENTES ant, int ID_USR)
        {
            throw new NotImplementedException();
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


        public IEnumerable<SD_AUTOS> ObtenerAutosPaginado(PagingInfo paginacion, FiltrosModel<SociosModel> filtros)
        {
            IQueryable<SD_AUTOS> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_AUTOSManager(uow);

                result = manager.BuscarTodos();
                filtros.FiltrarDatos();
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                if (!string.IsNullOrEmpty(filtros.Contiene))
                {
                    result = result.Where(x => x.MARCA.ToUpper().Contains(filtros.Contiene.ToUpper()));
                }
                paginacion.total = result.Count();
                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }


        public RespuestaSP GuardarAutos(SD_AUTOS auto, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                var context = (SindicatoContext)uow.Context;
                ObjectParameter p_res = new ObjectParameter("p_res", typeof(String));
                context.P_SD_ALTA_AUTOS(auto.ID_AUTO,auto.ID_MOVIL,auto.TIPO,auto.COLOR,auto.MARCA,auto.MODELO,auto.PLACA,auto.MOTOR,auto.CHASIS,auto.DESCRIPCION,auto.FECHA_ALTA,auto.FECHA_BAJA,auto.MOTIVO_CAMBIO, ID_USR, p_res);
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


        
    }
}

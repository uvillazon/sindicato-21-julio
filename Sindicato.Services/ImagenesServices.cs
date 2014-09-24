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
using System.Diagnostics;

namespace Sindicato.Services
{
    public class ImagenesServices : BaseService, IImagenesServices
    {
        //private ISD_LISTASManager _manListas;

        public ImagenesServices(/*ISD_LISTASManager manListas*/)
        {
            //_manListas = manListas;
        }


        public IEnumerable<SD_IMAGENES> ObtenerImagenesPaginado(PagingInfo paginacion, FiltrosModel<ImagenesModel> filtros)
        {
            IQueryable<SD_IMAGENES> result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_IMAGENESManager(uow);
                //obtener un query de la tabla choferes
                result = manager.BuscarTodos();

                //arma dinamicamente la consulta de criterios
                filtros.FiltrarDatos();
                //si tiene filtros se adiciona al query si no es la query
                result = filtros.Diccionario.Count() > 0 ? result.Where(filtros.Predicado, filtros.Diccionario.Values.ToArray()) : result;
                //if (!string.IsNullOrEmpty(filtros.Contiene))
                //{
                //    //result = result.Where(SD_SOCIOS
                //    //query filtrado por la variable contiene
                //    result = result.Where(SD_CHOFERES.Contiene(filtros.Contiene));

                //}

                paginacion.total = result.Count();

                result = manager.QueryPaged(result, paginacion.limit, paginacion.start, paginacion.sort, paginacion.dir);

            });
            return result;
        }

        public SD_IMAGENES BuscarImagen(Expression<Func<SD_IMAGENES, bool>> criterio)
        {
            SD_IMAGENES result = null;
            ExecuteManager(uow =>
            {
                var manager = new SD_IMAGENESManager(uow);
                var res = manager.BuscarTodos(criterio).OrderByDescending(x=>x.ID_IMG);


                result = res.FirstOrDefault();

            });
            return result;
        }

        public RespuestaSP GuarbarImagen(SD_IMAGENES img, int ID_USR)
        {
            RespuestaSP result = new RespuestaSP();
            ExecuteManager(uow =>
            {
                try
                {
                    var manager = new SD_IMAGENESManager(uow);
                    img.ID_USR = ID_USR;
                    var res = manager.BuscarTodos();
                    if (res.Count() > 0)
                    {
                        img.ID_IMG = res.Max(x => x.ID_IMG) + 1;
                    }
                    else
                    {
                        img.ID_IMG = 1;
                    }
                    manager.Add(img);
                    manager.Save();
                    result.msg = "proceso Ejecutado Correctamente";
                    result.success = true;
                }
                catch (Exception e)
                {
                    result.msg = e.ToString();
                    result.success = false;
                }

            });
            return result;
        }
    }
}

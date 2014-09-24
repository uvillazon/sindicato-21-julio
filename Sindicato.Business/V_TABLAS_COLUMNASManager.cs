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
    public class V_TABLAS_COLUMNASManager : Repository<V_TABLAS_COLUMNAS>
    {


        public V_TABLAS_COLUMNASManager(IUnitOfWork uow) : base(uow) { }


        
    }
}

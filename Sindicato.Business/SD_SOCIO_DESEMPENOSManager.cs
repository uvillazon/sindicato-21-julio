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
    public class SD_SOCIO_DESEMPENOSManager : Repository<SD_SOCIO_DESEMPENOS>
    {


        public SD_SOCIO_DESEMPENOSManager(IUnitOfWork uow) : base(uow) { }


        
    }
}
